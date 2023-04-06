import fetchResource from '../fetch';

export default {
    getPost(postId) {
        return fetchResource(`posts/post/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllPosts() {
        return fetchResource('posts', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllMyPosts() {
        return fetchResource('posts/my-posts', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    getAllPostsUser(userId) {
        return fetchResource(`posts/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    createPost(author, title, content, tags, attachement, attachmentMimeType) {
        return fetchResource('posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: {
                author,
                title,
                content,
                tags,
                attachement,
                attachmentMimeType
            }
        });
    },

    updateMyPost(postId, data) {
        return fetchResource(`posts/update-my-post/${postId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    },

    deleteMyPost(postId) {
        return fetchResource(`posts/delete-my-post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    deletePost(postId) {
        return fetchResource(`posts/post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    updatePost(postId, data) {
        return fetchResource(`posts/post/${postId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }
}
