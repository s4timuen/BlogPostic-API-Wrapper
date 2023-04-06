import ApiError from './error';

const rootUrl = 'http://127.0.0.1';
const port = '5200';
const api = '/api/v1'

const apiUrl = rootUrl.concat(':').concat(port).concat(api);

export default async (path, userOptions = {}) => {
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
