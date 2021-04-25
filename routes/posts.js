import {Router} from 'express';
import { postAdd, getPosts, removePosts, likePost, dislikePost } from '../controllers/posts.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();


//api/posts/add
router.post('/add', authMiddleware, postAdd );

//api/posts/get
router.post('/get', authMiddleware, getPosts );

//api/posts/remove
router.post('/remove', authMiddleware, removePosts );

//api/posts/like
router.post('/like', authMiddleware, likePost );

//api/posts/dislike
router.post('/dislike', authMiddleware,  dislikePost );



export default router;
