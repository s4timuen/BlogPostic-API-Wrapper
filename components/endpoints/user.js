import fetchResource from '../fetch';

export default {
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
    },

    login(email, password) {
        return fetchResource('users/login', {
            method: 'POST',
            headers: {},
            body: {
                email,
                password
            }
        });
    },

    logout() {
        return fetchResource('users/logout', {
            method: 'GET',
            headers: {}
        });
    },

    getAllUsers() {
        return fetchResource('users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getUserById(userId) {
        return fetchResource(`users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

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
    },

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
    },

    deleteUserById(userId) {
        return fetchResource(`users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    getMe() {
        return fetchResource('users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });
    },

    forgotPassword(email) {
        return fetchResource('users/forgot-password', {
            method: 'POST',
            headers: {},
            body: { email }
        });
    },

    resetPassword(token, password, passwordConfirm) {
        return fetchResource(`users/reset-password/${token}`, {
            method: 'PATCH',
            headers: {},
            body: {
                password,
                passwordConfirm
            }
        });
    },

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
    },

    deleteMe() {
        return fetchResource('users/delete-me', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    deactivateMe() {
        return fetchResource('users/deactivate-me', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    },

    reactivateUserToken(email) {
        return fetchResource('users/reactivate-user', {
            method: 'POST',
            headers: {},
            body: { email }
        });
    },

    reactivateUser(token) {
        return fetchResource(`users/reactivate-user/${token}`, {
            method: 'GET',
            headers: {},
            body: {}
        });
    },

    updateMyData(data) {
        return fetchResource('users/update-my-data', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: { ...data }
        });
    }
}
