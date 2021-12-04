package com.hana.project.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hana.project.model.dto.request.MakingRequest;
import com.hana.project.model.dto.response.BlogResponse;
import com.hana.project.model.dto.response.CollectionResponse;
import com.hana.project.model.dto.response.LandingResponse;
import com.hana.project.model.type.EmailTemplate;
import com.hana.project.service.BlogService;
import com.hana.project.service.CollectionService;
import com.hana.project.service.TopImageService;
import com.hana.project.util.NotificationService;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/landing", produces = MediaType.APPLICATION_JSON_VALUE)
@PermitAll
@RequiredArgsConstructor
public class LandingController {

  private final CollectionService collectionService;
  private final BlogService blogService;
  private final TopImageService topImageService;
  private final ModelMapper mapper;
  private final NotificationService notificationService;
  private final ObjectMapper objectMapper;

  @GetMapping
  public LandingResponse bootstrap() {
    List<String> topLinks = topImageService.getList().stream().map(file -> file.getLink()).collect(
        Collectors.toList());
    List<CollectionResponse> collections = collectionService.getList()
        .stream().map(page ->
            mapper.map(page, CollectionResponse.class)
        ).collect(Collectors.toList());
    List<BlogResponse> blogs = blogService.getList().stream()
        .map(blog -> mapper.map(blog, BlogResponse.class)).collect(
            Collectors.toList());
    return new LandingResponse(topLinks, collections, blogs);
  }

  @GetMapping("/collection/{id}")
  public CollectionResponse getOne(@PathVariable UUID id) throws NotFoundException {
    return mapper.map(collectionService.getOne(id), CollectionResponse.class);
  }

  @PostMapping("making-request")
  public void makingRequest(@RequestBody @Validated MakingRequest request) {
    notificationService.send(EmailTemplate.PACKAGE_MAKING_REQUEST,
        objectMapper.convertValue(request, Map.class));
  }
}
