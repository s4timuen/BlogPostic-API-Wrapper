import fetchResource from '../fetch';

export default {
    getArticle(articleId) {
        return fetchResource(`articles/article/${articleId}`, {
            method: 'GET',
            headers: {}
        });
    },

    getAllArticles() {
        return fetchResource('articles', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllMyArticles() {
        return fetchResource('articles/my-articles', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    getAllArticlesUser(userId) {
        return fetchResource(`articles/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    createArticle(author, blog, title, content, tags, links, attachements, attachmentsMimeTypes) {
        return fetchResource('articles', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: {
                author,
                blog,
                title,
                links,
                content,
                tags,
                attachements,
                attachmentsMimeTypes
            }
        });
    },

    updateMyArticle(articleId, data) {
        return fetchResource(`articles/update-my-article/${articleId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    },

    deleteMyArticle(articleId) {
        return fetchResource(`articles/delete-my-article/${articleId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    deleteArticle(articleId) {
        return fetchResource(`articles/article/${articleId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    updateArticle(articleId, data) {
        return fetchResource(`articles/article/${articleId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }
}
