
package com.blog.blogbackend.service;

import com.blog.blogbackend.entity.Blog;
import com.blog.blogbackend.entity.User;
import com.blog.blogbackend.repository.BlogRepository;
import com.blog.blogbackend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogService(
            BlogRepository blogRepository,
            UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    // Create blog
    public Blog createBlog(Blog blog, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        blog.setAuthor(user.getName());
        blog.setOwnerEmail(user.getEmail());

        return blogRepository.save(blog);
    }

    // Get all public blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get logged-in user's blogs
    public List<Blog> getMyBlogs(String email) {
        return blogRepository.findByOwnerEmail(email);
    }

    // Get blog by ID
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Blog not found"));
    }

    // Update only your own blog
    public Blog updateBlog(Long id, Blog updatedBlog, String email) {

        Blog existingBlog = blogRepository
                .findByIdAndOwnerEmail(id, email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Blog not found or you do not own this blog"));

        existingBlog.setTitle(updatedBlog.getTitle());
        existingBlog.setContent(updatedBlog.getContent());

        return blogRepository.save(existingBlog);
    }

    // Delete only your own blog
    public void deleteBlog(Long id, String email) {

        Blog existingBlog = blogRepository
                .findByIdAndOwnerEmail(id, email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Blog not found or you do not own this blog"));

        blogRepository.delete(existingBlog);
    }
}
