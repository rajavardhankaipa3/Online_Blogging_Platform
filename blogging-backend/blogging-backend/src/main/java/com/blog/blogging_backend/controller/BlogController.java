
package com.blog.blogbackend.controller;

import com.blog.blogbackend.entity.Blog;
import com.blog.blogbackend.service.BlogService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Create a blog
    @PostMapping
    public Blog createBlog(
            @RequestBody Blog blog,
            Principal principal) {
        return blogService.createBlog(blog, principal.getName());
    }

    // Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // Get logged-in user's blogs
    @GetMapping("/mine")
    public List<Blog> getMyBlogs(Principal principal) {
        return blogService.getMyBlogs(principal.getName());
    }

    // Get blog by ID
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    // Update blog
    @PutMapping("/{id}")
    public Blog updateBlog(
            @PathVariable Long id,
            @RequestBody Blog blog,
            Principal principal) {

        return blogService.updateBlog(
                id, blog, principal.getName());
    }

    // Delete blog
    @DeleteMapping("/{id}")
    public String deleteBlog(
            @PathVariable Long id,
            Principal principal) {

        blogService.deleteBlog(id, principal.getName());

        return "Blog deleted successfully";
    }
}
