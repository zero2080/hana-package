package com.hana.project.model.entity;

import com.hana.project.model.type.FileTarget;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class File {

  @Id
  @GeneratedValue
  @Type(type = "uuid-char")
  private UUID id;

  @Column(nullable = false)
  private int sortOrder;

  @Column(nullable = false)
  private FileTarget target;

  @Type(type = "uuid-char")
  private UUID targetId;

  private String type;

  public File(Collection collection) {
    setTarget(FileTarget.COLLECTION);
    setTargetId(collection.getId());
  }

  public File(Blog blog) {
    setTarget(FileTarget.BLOG);
    setTargetId(blog.getId());
  }

  public File(FileTarget type, UUID id) {
    setTarget(FileTarget.TOP);
    setTargetId(id);
  }

  public String getLink() {
    return String.join("/", "https://s3.ap-northeast-2.amazonaws.com/hana-package.syopingbaeg.com",
        getPath());
  }

  public String getPath() {
    return String.join("/", target.getDescription(),
        targetId.toString(), String.format("%s.%s", id, type));
  }
}
