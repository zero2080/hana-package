package com.hana.project.model.dto.response;

import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class LandingResponse {

  private List<String> topImages;
  private List<CollectionResponse> collections;
  private List<BlogResponse> blogs;

  public List<String> getTopImages() {
    if (topImages == null) {
      return Collections.emptyList();
    } else {
      return topImages;
    }
  }

  public List<CollectionResponse> getCollections() {
    if (collections == null) {
      return Collections.emptyList();
    } else {
      return collections;
    }
  }

  public List<BlogResponse> getBlogs() {
    if (blogs == null) {
      return Collections.emptyList();
    } else {
      return blogs;
    }
  }
}
