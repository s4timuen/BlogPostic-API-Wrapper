import endpoints from './endpoints.json';

const rootUrl = 'https://127.0.0.1';
const port = '5200';
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
    const defaultOptions = {};
    const defaultHeaders = {};

    const url = `${apiUrl}/${path}`;
    const isFile = options.body instanceof File;

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

    return await fetch(url, options) // TODO: POST, etc?
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
class ApiWrapper {
    constructor() {};

    signin() {

    }

    login() {

    }

    logout() {

    }

    getAllUsers() {
        return fetchResource('users');
    }

    createUser() {

    }

    getUserById() {

    }

    updateUserById() {

    }

    deleteUserById() {

    }
}

export default ApiWrapper;
