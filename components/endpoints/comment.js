import fetchResource from '../fetch';

export default {
    getComment(commentId) {
        return fetchResource(`comments/comment/${commentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllCommentsRef(refType, refId) {
        return fetchResource(`comments/${refType}/${refId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllComments() {
        return fetchResource('comments', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getAllMyComments() {
        return fetchResource('comments/my-comments', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    getAllCommentUser(userId) {
        return fetchResource(`comments/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

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
    },

    updateMyComment(commentId, data) {
        return fetchResource(`comments/update-my-comment/${commentId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    },

    deleteMyComment(commentId) {
        return fetchResource(`comments/delete-my-comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    deleteComment(commentId) {
        return fetchResource(`comments/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

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
