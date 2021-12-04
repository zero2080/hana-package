package com.hana.project.repository;

import com.hana.project.model.entity.Collection;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<Collection, UUID> {

}
