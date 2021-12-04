package com.hana.project.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BlogResponse {

  private UUID id;
  private String title;
  private String target;

  @JsonIgnore
  private FileResponse thumb;

  private LocalDateTime createdAt;

  public String getLink() {
    if (thumb != null) {
      return thumb.getLink();
    } else {
      return "";
    }
  }
}
