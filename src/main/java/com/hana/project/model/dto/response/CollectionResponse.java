package com.hana.project.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(Include.NON_NULL)
public class CollectionResponse {

  private UUID id;
  @JsonProperty(value = "description")
  private String title;
  private String type;
  private LocalDateTime createdAt;

  @JsonIgnore
  private List<FileResponse> files;

  public String getThumb() {
    if (files.size() > 0) {
      return files.get(0).getLink();
    } else {
      return "";
    }
  }

  public List<String> getDetail() {
    if (files.size() > 0) {
      List<String> links = new ArrayList<>();
      for (int i = 1; i < files.size(); i++) {
        links.add(files.get(i).getLink());
      }
      return links;
    } else {
      return Collections.emptyList();
    }
  }
}
