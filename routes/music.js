import {Router} from 'express';
import { getAllMusic, getMyMusic, addMusic, deleteMusic } from '../controllers/music.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();


//api/music/all
router.post('/all', authMiddleware, getAllMusic);

//api/music/my
router.post('/my', authMiddleware, getMyMusic);

//api/music/add
router.post('/add', authMiddleware, addMusic);

//api/music/delete
router.post('/delete', authMiddleware, deleteMusic);


export default router;