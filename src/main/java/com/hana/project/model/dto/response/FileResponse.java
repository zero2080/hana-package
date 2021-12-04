package com.hana.project.model.dto.response;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileResponse {

  private UUID id;
  private String link;
  private int sortOrder;
}
