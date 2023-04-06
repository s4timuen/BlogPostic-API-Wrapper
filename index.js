import user from './components/endpoints/user';
import blog from './components/endpoints/blog';
import article from './components/endpoints/article';
import post from './components/endpoints/post';
import comment from './components/endpoints/comment';


export default class ApiWrapper {
    constructor() {
        this.jwt = '';
        this.user = user;
        this.blog = blog;
        this.article = article;
        this.post = post;
        this.comment = comment;
    };

    /**
     * Set jwt for auth.
     */
    setJwt(jwt) {
        this.jwt = jwt;
    }
}
