import {Router} from 'express';
import { addMessage, getMessages, getMessageMenu, createDialog } from '../controllers/messages.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();

//api/messages/menu
router.get('/menu', authMiddleware, getMessageMenu);

//api/messages/add
router.post('/add', authMiddleware, addMessage);

//api/messages/:id
router.get('/:id', authMiddleware, getMessages);

//api/messages/create
router.post('/create', authMiddleware, createDialog);


export default router;
