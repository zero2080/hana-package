package com.hana.project.repository;

import com.hana.project.model.entity.File;
import com.hana.project.model.type.FileTarget;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, UUID> {

  List<File> findByTargetIdOrderBySortOrder(UUID id);

  File findByTargetId(UUID id);

  File findByTarget(FileTarget target);

}
