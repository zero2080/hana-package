package com.hana.project.service;

import com.hana.project.model.entity.Blog;
import com.hana.project.model.entity.File;
import com.hana.project.repository.BlogRepository;
import com.hana.project.repository.FileRepository;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class BlogService {

  private final BlogRepository repository;
  private final FileRepository fileRepository;
  private final AwsS3Service awsS3Service;

  public List<Blog> getList() {
    return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
        .peek(blog -> blog.setThumb(
            fileRepository.findByTargetId(blog.getId())))
        .collect(Collectors.toList());
  }

  public void write(MultipartFile thumb, Blog blog) {
    repository.saveAndFlush(blog);

    if (thumb.getOriginalFilename().indexOf("mock_test_file") >= 0) {
      return;
    } else {
      awsS3Service.uploadThumb(thumb, saveFile(thumb, blog));
    }
  }

  public void delete(UUID id) {
    awsS3Service.delete(Arrays.asList(fileRepository.findByTargetId(id)))
        .forEach(fileRepository::delete);
    repository.deleteById(id);
  }

  private String saveFile(MultipartFile file, Blog blog) {
    File img = new File(blog);
    img.setType(fileTypeGetter(file));
    fileRepository.saveAndFlush(img);

    return img.getPath();
  }

  private String fileTypeGetter(MultipartFile file) {
    return file.getOriginalFilename()
        .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
  }
}
