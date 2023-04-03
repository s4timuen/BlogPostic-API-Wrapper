const rootUrl = 'http://127.0.0.1';
const port = ':5200';
const api = '/api/v1'

const apiUrl = rootUrl.concat(port).concat(api);

////////// Error Handling //////////
class ApiError {
    constructor(message, data, status) {
        let response = null;
        let isObject = false;

        try {
            response = JSON.parse(data);
            isObject = true;
        } catch (err) {
            response = data;
        }

        this.response = response;
        this.message = message;
        this.status = status;
        this.toString = function () {
            return `${this.message}\nResponse:\n${isObject ? JSON.stringify(this.response, null, 2) : this.response}`;
        };
    };
}

////////// Fetch Functionality //////////
const fetchResource = async (path, userOptions = {}) => {
    const defaultOptions = {
        credentials: 'include'
    };
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const url = `${apiUrl}/${path}`;
    const isFile = userOptions.body instanceof File;

    let response = null;

    const options = {
        ...defaultOptions,
        ...userOptions,
        headers: {
            ...defaultHeaders,
            ...userOptions.headers,
        },
    };

    if (options.body && typeof options.body === 'object' && !isFile) {
        options.body = JSON.stringify(options.body);
    }

    return fetch(url, options)
        .then(responseObject => {
            return responseObject.json();
        })
        .catch(error => {
            if (response) {
                throw new ApiError(`Request failed with status ${response.status}.`, error, response.status);
            } else {
                throw new ApiError(error.toString(), null, 'REQUEST_FAILED');
            }
        });
};

////////// API Wrapper //////////
export default class ApiWrapper {
    constructor() {
        this.jwt = '';
    };

    /**
     * Set jwt for auth.
     */
    setJwt(jwt) {
        this.jwt = jwt;
    }

    ////////// Users Requests //////////
    signup(firstName, lastName, email, password, passwordConfirm) {
        return fetchResource('users/signup', {
            method: 'POST',
            headers: {},
            body: {
                firstName,
                lastName,
                email,
                password,
                passwordConfirm
            }
        });
    }

    login(email, password) {
        return fetchResource('users/login', {
            method: 'POST',
            headers: {},
            body: {
                email,
                password
            }
        });
    }

    logout() {
        return fetchResource('users/logout', {
            method: 'GET',
            headers: {}
        });
    }

    getAllUsers() {
        return fetchResource('users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getUserById(userId) {
        return fetchResource(`users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    createUser(firstName, lastName, email, password, passwordConfirm) {
        return fetchResource('users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            },
            body: {
                firstName,
                lastName,
                email,
                password,
                passwordConfirm
            }
        });
    }

    updateUserById(userId, data) {
        return fetchResource(`users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            },
            body: {
                ...data
            }
        });
    }

    deleteUserById(userId) {
        return fetchResource(`users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getMe() {
        return fetchResource('users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    forgotPassword(email) {
        return fetchResource('users/forgot-password', {
            method: 'POST',
            headers: {},
            body: { email }
        });
    }

    resetPassword(token, password, passwordConfirm) {
        return fetchResource(`users/reset-password/${token}`, {
            method: 'PATCH',
            headers: {},
            body: {
                password,
                passwordConfirm
            }
        });
    }

    updatePassword(passwordCurrent, passwordNew, passwordConfirm) {
        return fetchResource('users/update-password', {
            method: 'PATCH',
            header: {},
            body: {
                passwordCurrent,
                passwordNew,
                passwordConfirm
            }
        });
    }

    deleteMe() {
        return fetchResource('users/delete-me', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    deactivateMe() {
        return fetchResource('users/deactivate-me', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    reactivateUserToken(email) {
        return fetchResource('users/reactivate-user', {
            method: 'POST',
            headers: {},
            body: { email }
        });
    }

    reactivateUser(token) {
        return fetchResource(`users/reactivate-user/${token}`, {
            method: 'GET',
            headers: {},
            body: {}
        });
    }

    updateMyData(data) {
        return fetchResource('users/update-my-data', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    ////////// Blog Requests //////////
    getBlog(blogId) {
        return fetchResource(`blogs/blog/${blogId}`, {
            method: 'GET',
            headers: {}
        });
    }

    getAllBlogs() {
        return fetchResource('blogs', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllMyBlogs() {
        return fetchResource('blogs/my-blogs', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    getAllBlogsUser(userId) {
        return fetchResource(`blogs/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

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
    }

    updateMyBlog(blogId, data) {
        return fetchResource(`blogs/update-my-blog/${blogId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    deleteMyBlog(blogId) {
        return fetchResource(`blogs/delete-my-blog/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    deleteBlog(blogId) {
        return fetchResource(`blogs/blog/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    updateBlog(blogId, data) {
        return fetchResource(`blogs/blog/${blogId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    ////////// Article Requests //////////
    getArticle(articleId) {
        return fetchResource(`articles/article/${articleId}`, {
            method: 'GET',
            headers: {}
        });
    }

    getAllArticles() {
        return fetchResource('articles', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllMyArticles() {
        return fetchResource('articles/my-articles', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    getAllArticlesUser(userId) {
        return fetchResource(`articles/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

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
    }

    updateMyArticle(articleId, data) {
        return fetchResource(`articles/update-my-article/${articleId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    deleteMyArticle(articleId) {
        return fetchResource(`articles/delete-my-article/${articleId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    deleteArticle(articleId) {
        return fetchResource(`articles/article/${articleId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    updateArticle(articleId, data) {
        return fetchResource(`articles/article/${articleId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    ////////// Post Requests //////////
    getPost(postId) {
        return fetchResource(`posts/post/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllPosts() {
        return fetchResource('posts', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllMyPosts() {
        return fetchResource('posts/my-posts', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    getAllPostsUser(userId) {
        return fetchResource(`posts/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

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
    }

    updateMyPost(postId, data) {
        return fetchResource(`posts/update-my-post/${postId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    deleteMyPost(postId) {
        return fetchResource(`posts/delete-my-post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    deletePost(postId) {
        return fetchResource(`posts/post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    updatePost(postId, data) {
        return fetchResource(`posts/post/${postId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    ////////// Comment Requests //////////
    getComment(commentId) {
        return fetchResource(`comments/comment/${commentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllCommentsRef(refType, refId) {
        return fetchResource(`comments/${refType}/${refId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllComments() {
        return fetchResource('comments', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    }

    getAllMyComments() {
        return fetchResource('comments/my-comments', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    getAllCommentUser(userId) {
        return fetchResource(`comments/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    createComment(author, reference, isCommentOn, content) {
        return fetchResource('comments', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: {
                author,
                reference,
                isCommentOn,
                content
            }
        });
    }

    updateMyComment(commentId, data) {
        return fetchResource(`comments/update-my-comment/${commentId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }

    deleteMyComment(commentId) {
        return fetchResource(`comments/delete-my-comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    deleteComment(commentId) {
        return fetchResource(`comments/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    updateComment(commentId, data) {
        return fetchResource(`comments/comment/${commentId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }
}
