package com.hana.project.model.type;

import lombok.Getter;

@Getter
public enum FileTarget {
  COLLECTION(0, "collection"),
  BLOG(1, "blog"),
  TOP(2, "top"),
  INTRODUCE_PRODUCT(3, "inroduce_product"),
  INTRODUCE_BACKGROUND(4, "introduce_background");

  private final int code;
  private final String description;

  FileTarget(int code, String description) {
    this.code = code;
    this.description = description;
  }
}
