package com.hana.project.service;

import com.hana.project.model.entity.File;
import com.hana.project.model.type.FileTarget;
import com.hana.project.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class IntroduceService {

  private final AwsS3Service awsS3Service;
  private final FileRepository fileRepository;

  public void changeFile(FileTarget target, MultipartFile file) {
    File img = fileRepository.findByTarget(target);
    String fileType = fileTypeGetter(file);
    img.setType(fileType);
    awsS3Service.upload(file, String.format("img/%s", img.getId()));
  }

  private String fileTypeGetter(MultipartFile file) {
    return file.getOriginalFilename()
        .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
  }
}
