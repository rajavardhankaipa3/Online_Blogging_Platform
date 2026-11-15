
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState("all");
    const [editingId, setEditingId] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Load blogs
    const fetchBlogs = async (selectedView = view) => {
        try {
            const endpoint =
                selectedView === "mine" ? "/blogs/mine" : "/blogs";

            const response = await api.get(endpoint);
            setBlogs(response.data);
        } catch (error) {
            console.error("Loading blogs failed:", error);
            setMessage("Unable to load blogs.");
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        fetchBlogs("all");
    }, []);

    // Switch between all blogs and my blogs
    const changeView = (selectedView) => {
        setView(selectedView);
        setMessage("");
        fetchBlogs(selectedView);
    };

    // Create or update blog
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setMessage("Please enter title and content.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            if (editingId) {
                await api.put(`/blogs/${editingId}`, {
                    title,
                    content
                });

                setMessage("Blog updated successfully!");
            } else {
                await api.post("/blogs", {
                    title,
                    author: user.name || "Anonymous",
                    content
                });

                setMessage("Blog published successfully!");
            }

            setTitle("");
            setContent("");
            setEditingId(null);

            await fetchBlogs(view);

        } catch (error) {
            console.error("Blog operation failed:", error);
            setMessage(
                error.response?.data?.message ||
                "Operation failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Load blog details into form
    const handleEdit = (blog) => {
        setEditingId(blog.id);
        setTitle(blog.title);
        setContent(blog.content);
        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
        setMessage("");
    };

    // Delete blog
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/blogs/${id}`);

            setMessage("Blog deleted successfully!");
            await fetchBlogs(view);

        } catch (error) {
            console.error("Delete failed:", error);
            setMessage(
                error.response?.data?.message ||
                "Unable to delete blog."
            );
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <h1>My Blogging Platform</h1>

                <div className="header-right">
                    <span>Welcome, {user.name || "User"}</span>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-content">

                <section className="create-blog">
                    <h2>
                        {editingId ? "Edit Blog" : "Create New Blog"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={200}
                            required
                        />

                        <textarea
                            placeholder="Write your blog content..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="7"
                            required
                        />

                        <div className="form-buttons">
                            <button type="submit" disabled={loading}>
                                {loading
                                    ? "Please wait..."
                                    : editingId
                                        ? "Update Blog"
                                        : "Publish Blog"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {message && <p className="status-message">{message}</p>}
                </section>

                <section className="blog-list">

                    <div className="blog-list-header">
                        <h2>
                            {view === "mine" ? "My Blogs" : "All Blogs"}
                        </h2>

                        <div className="view-buttons">
                            <button
                                className={view === "all" ? "active" : ""}
                                onClick={() => changeView("all")}
                            >
                                All Blogs
                            </button>

                            <button
                                className={view === "mine" ? "active" : ""}
                                onClick={() => changeView("mine")}
                            >
                                My Blogs
                            </button>
                        </div>
                    </div>

                    {blogs.length === 0 ? (
                        <p className="empty-message">
                            No blogs found.
                        </p>
                    ) : (
                        blogs.map((blog) => (
                            <article className="blog-card" key={blog.id}>

                                <h3>{blog.title}</h3>

                                <p className="blog-author">
                                    By {blog.author}
                                </p>

                                <p className="blog-content">
                                    {blog.content}
                                </p>

                                <small>
                                    {blog.createdAt
                                        ? new Date(blog.createdAt)
                                            .toLocaleString()
                                        : ""}
                                </small>

                                {view === "mine" && (
                                    <div className="blog-actions">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(blog.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                            </article>
                        ))
                    )}
                </section>

            </main>
        </div>
    );
}

export default Dashboard;
