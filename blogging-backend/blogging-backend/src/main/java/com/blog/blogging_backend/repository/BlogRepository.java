
package com.blog.blogbackend.repository;

import com.blog.blogbackend.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    List<Blog> findByOwnerEmail(String ownerEmail);

    Optional<Blog> findByIdAndOwnerEmail(Long id, String ownerEmail);
}
