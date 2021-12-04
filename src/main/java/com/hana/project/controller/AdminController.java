package com.hana.project.controller;

import com.hana.project.model.dto.request.AdminChangePasswordRequest;
import com.hana.project.model.dto.request.BlogRequest;
import com.hana.project.model.dto.request.CollectionRequest;
import com.hana.project.model.entity.AdminUser;
import com.hana.project.model.entity.Blog;
import com.hana.project.model.entity.Collection;
import com.hana.project.model.type.FileTarget;
import com.hana.project.service.AdminService;
import com.hana.project.service.BlogService;
import com.hana.project.service.CollectionService;
import com.hana.project.service.IntroduceService;
import com.hana.project.service.TopImageService;
import java.util.UUID;
import javax.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@RequestMapping(path = "/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminController {

  private final CollectionService collectionService;
  private final BlogService blogService;
  private final ModelMapper mapper;
  private final AdminService adminService;
  private final TopImageService topImageService;
  private final IntroduceService introduceService;

  @PutMapping(path = "/profile")
  public void updateProfile(@RequestBody AdminChangePasswordRequest password,
      @AuthenticationPrincipal AdminUser user) {
    adminService.updateProfile(password, user);
  }

  @PostMapping(path = "/top", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public void top_write(@RequestParam @NotEmpty MultipartFile thumb) {
    topImageService.write(thumb);
  }

  @DeleteMapping("/top/{id}")
  public void top_delete(@PathVariable UUID id) {
    topImageService.delete(id);
  }

  @PostMapping(path = "/collection", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public void collection_write(@ModelAttribute CollectionRequest request) {
    collectionService.write(request.getFiles(), mapper.map(request, Collection.class));
  }

  @DeleteMapping("/collection/{id}")
  public void collection_delete(@PathVariable UUID id) {
    collectionService.delete(id);
  }

  @PostMapping(path = "/blog", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public void blog_write(@ModelAttribute BlogRequest request) {
    blogService.write(request.getThumb(), mapper.map(request, Blog.class));
  }

  @DeleteMapping("/blog/{id}")
  public void blog_delete(@PathVariable UUID id) {
    blogService.delete(id);
  }

  @PostMapping(path = "/introduce/product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public void changeIntroduceProductThumbnail(MultipartFile file) {
    introduceService.changeFile(FileTarget.INTRODUCE_PRODUCT, file);
  }

  @PostMapping(path = "/introduce/background", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public void changeIntroduceProductBackground(MultipartFile file) {
    introduceService.changeFile(FileTarget.INTRODUCE_BACKGROUND, file);
  }
}
