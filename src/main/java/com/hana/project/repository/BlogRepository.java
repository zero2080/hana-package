package com.hana.project.repository;

import com.hana.project.model.entity.Blog;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, UUID> {

}
