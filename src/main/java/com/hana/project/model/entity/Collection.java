package com.hana.project.model.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Collection {

  @Id
  @GeneratedValue
  @Type(type = "uuid-char")
  private UUID id;

  @Transient
  private File thumb;

  @Transient
  private List<File> files;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String type;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

}

