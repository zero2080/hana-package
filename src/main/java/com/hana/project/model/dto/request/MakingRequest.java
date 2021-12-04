package com.hana.project.model.dto.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MakingRequest {

  @NotBlank
  private String sample;

  private String count = "협의";

  private int width;
  private int height;
  private int depth;

  @NotBlank
  private String tel;

  @NotBlank
  private String name;

  @NotNull
  private String company;

  @Email
  private String email;
}
