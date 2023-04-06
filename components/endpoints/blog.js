import fetchResource from '../fetch';

export default {
    getBlog(blogId) {
        return fetchResource(`blogs/blog/${blogId}`, {
            method: 'GET',
            headers: {}
        });
    },

    getAllBlogs() {
        return fetchResource('blogs', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllMyBlogs() {
        return fetchResource('blogs/my-blogs', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    getAllBlogsUser(userId) {
        return fetchResource(`blogs/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    createBlog(author, title, description, tags) {
        return fetchResource('blogs/create-blog', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: {
                author,
                title,
                description,
                tags
            }
        });
    },

    updateMyBlog(blogId, data) {
        return fetchResource(`blogs/update-my-blog/${blogId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    },

    deleteMyBlog(blogId) {
        return fetchResource(`blogs/delete-my-blog/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    deleteBlog(blogId) {
        return fetchResource(`blogs/blog/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    updateBlog(blogId, data) {
        return fetchResource(`blogs/blog/${blogId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }
}
