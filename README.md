# BlogPostic-API-Wrapper
API-Wrapper for the BlogPostic social media platform.

# How to use
Create wrapper object:
```const apiWrapper = new ApiWrapper();```
Get jwt from unprotected route (e.g. login):
```apiWrapper.user.login(email, password)```
Set jwt (neccessary to use protected routes):
```apiWrapper.setJwt(jwt)```
Use endpoints (e.g. get user data)
```apiWrapper.user.getMe()```
