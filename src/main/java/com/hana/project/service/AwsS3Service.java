package com.hana.project.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GroupGrantee;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.Permission;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.hana.project.exceptions.BaseException;
import com.hana.project.exceptions.type.CommonErrorCode;
import com.hana.project.model.entity.File;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import javax.imageio.ImageIO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@Slf4j
@RequiredArgsConstructor
public class AwsS3Service {

  private final AmazonS3Client awsS3;
  @Value("${cloud.aws.s3.bucket}")
  private String bucketName;

  public void upload(MultipartFile file, String filePath) {
    if (!awsS3.doesBucketExistV2(bucketName)) {
      awsS3.createBucket(bucketName);
    }

    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType(file.getContentType());
    metadata.setContentLength(file.getSize());

    try {
      PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, filePath,
          file.getInputStream(), metadata);
      AccessControlList acl = new AccessControlList();
      acl.grantPermission(GroupGrantee.AllUsers, Permission.Read);
      putObjectRequest.setAccessControlList(acl);
      awsS3.putObject(putObjectRequest);


    } catch (IOException e) {
      log.error("File upload failed", e);
      throw BaseException.from(CommonErrorCode.SERVER_ERROR);
    }
  }

  public List<File> delete(List<File> files) {
    for (File file : files) {
      DeleteObjectRequest objectRequest = new DeleteObjectRequest(bucketName, file.getPath());
      awsS3.deleteObject(objectRequest);
    }
    return files;
  }


  public void uploadThumb(MultipartFile file, String filePath) {
    CollectionFileStream collectionFileStream = makeThumbnail(file);

    if (!awsS3.doesBucketExistV2(bucketName)) {
      awsS3.createBucket(bucketName);
    }

    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType(file.getContentType());
    metadata.setContentLength(collectionFileStream.getSize());

    try {
      PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, filePath,
          collectionFileStream.getStream(), metadata);
      AccessControlList acl = new AccessControlList();
      acl.grantPermission(GroupGrantee.AllUsers, Permission.Read);
      putObjectRequest.setAccessControlList(acl);
      awsS3.putObject(putObjectRequest);


    } catch (Exception e) {
      log.error("File upload failed", e);
      throw BaseException.from(CommonErrorCode.SERVER_ERROR);
    }

  }

  /**
   * 썸네일을 생성합니다. * 250 x 250 크기의 썸네일을 만듭니다.
   */
  private CollectionFileStream makeThumbnail(MultipartFile file) {
    // 저장된 원본파일로부터 BufferedImage 객체를 생성합니다.
    try {
      BufferedImage srcImg = ImageIO.read(file.getInputStream());

      // 썸네일의 너비와 높이 입니다.
      int dw = 250, dh = 250;

      // 원본 이미지의 너비와 높이 입니다.
      int ow = srcImg.getWidth();
      int oh = srcImg.getHeight();

      // 원본 너비를 기준으로 하여 썸네일의 비율로 높이를 계산합니다.
      int nw = ow;
      int nh = (ow * dh) / dw;

      // 계산된 높이가 원본보다 높다면 crop이 안되므로
      // 원본 높이를 기준으로 썸네일의 비율로 너비를 계산합니다.
      if (nh > oh) {
        nw = (oh * dw) / dh;
        nh = oh;
      }

      // 계산된 크기로 원본이미지를 가운데에서 crop 합니다.
      BufferedImage cropImg = Scalr.crop(srcImg, (ow - nw) / 2, (oh - nh) / 2, nw, nh);

      // crop된 이미지로 썸네일을 생성합니다.
      BufferedImage destImg = Scalr.resize(cropImg, dw, dh);

      ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
      String imageType = file.getContentType();
      ImageIO.write(destImg, imageType.substring(imageType.indexOf("/") + 1), outputStream);

      return new CollectionFileStream(new ByteArrayInputStream(outputStream.toByteArray()),
          outputStream.size());
    } catch (Exception e) {
      e.printStackTrace();
      throw BaseException.from(CommonErrorCode.SERVER_ERROR);
    }
  }

  @Getter
  @AllArgsConstructor
  private static class CollectionFileStream {

    private InputStream stream;
    private int size;
  }
}
