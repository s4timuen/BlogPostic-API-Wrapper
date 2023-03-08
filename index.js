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
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    getUserById(userId) {
        return fetchResource(`users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    createUser(firstName, lastName, email, password, passwordConfirm) {
        return fetchResource('users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
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
                Authorization: `Bearer ${this.jwt}`,
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
                Authorization: `Bearer ${this.jwt}`,
            }
        });
    }

    getMe() {
        return fetchResource('users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
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
}
