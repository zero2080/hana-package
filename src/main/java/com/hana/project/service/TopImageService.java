package com.hana.project.service;

import com.hana.project.model.entity.File;
import com.hana.project.model.type.FileTarget;
import com.hana.project.repository.FileRepository;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TopImageService {

  private static final UUID topId = UUID.fromString("bbbb0001-bbbb-bbbb-bbbb-aaaaaa000000");
  private final FileRepository fileRepository;
  private final AwsS3Service awsS3Service;

  public List<File> getList() {
    return fileRepository.findByTargetIdOrderBySortOrder(topId);
  }

  public void write(MultipartFile file) {
    awsS3Service.upload(file, saveFile(file));
  }

  public void delete(UUID id) {
    File file = fileRepository.findById(id).get();
    awsS3Service.delete(Arrays.asList(file)).forEach(fileRepository::delete);
  }

  private String saveFile(MultipartFile file) {
    File img = new File(FileTarget.TOP, topId);
    img.setType(fileTypeGetter(file));
    fileRepository.saveAndFlush(img);

    return img.getPath();
  }

  private String fileTypeGetter(MultipartFile file) {
    return file.getOriginalFilename()
        .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
  }
}
