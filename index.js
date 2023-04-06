import user from './components/user';
import blog from './components/blog';
import article from './components/endpoints/article';
import post from './components/post';
import comment from './components/comment';


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
