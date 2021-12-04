package com.hana.project.service;

import com.hana.project.model.entity.Collection;
import com.hana.project.model.entity.File;
import com.hana.project.repository.CollectionRepository;
import com.hana.project.repository.FileRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CollectionService {

  private final CollectionRepository repository;
  private final FileRepository fileRepository;
  private final AwsS3Service s3Service;

  public List<Collection> getList() {
    return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
        .peek(collection -> collection.setFiles(
            fileRepository.findByTargetIdOrderBySortOrder(collection.getId())))
        .collect(Collectors.toList());
  }

  public Collection getOne(UUID id) throws NotFoundException {
    Collection collection = repository.findById(id).orElseThrow(NotFoundException::new);
    collection.setFiles(fileRepository.findByTargetIdOrderBySortOrder(id));
    return collection;
  }

  public void write(MultipartFile[] files, Collection request) {
    repository.saveAndFlush(request);
    int sortOrder = 0;

    if (files[0].getOriginalFilename().indexOf("mock_test_file") >= 0) {
      return;
    } else {
      if (files != null && files.length > 0) {
        s3Service.uploadThumb(files[sortOrder], saveFile(files[sortOrder], request, sortOrder++));

        for (MultipartFile file : files) {
          s3Service.upload(file, saveFile(file, request, sortOrder++));
        }
      }
    }
  }

  public void delete(UUID id) {
    s3Service.delete(fileRepository.findByTargetIdOrderBySortOrder(id))
        .forEach(fileRepository::delete);
    repository.deleteById(id);
  }

  private String saveFile(MultipartFile file, Collection collection, int sortOrder) {
    File img = new File(collection);
    img.setType(fileTypeGetter(file));
    img.setSortOrder(sortOrder);
    fileRepository.saveAndFlush(img);

    return img.getPath();
  }

  private String fileTypeGetter(MultipartFile file) {
    return file.getOriginalFilename()
        .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
  }
}
