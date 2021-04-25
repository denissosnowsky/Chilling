import {Router} from 'express';
import { user, saveSmallPhoto, saveBigPhoto, setStatus, setCity, setBirth, setEducation, setPhone, setBook} from '../controllers/profile.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// api/profile/:id
router.get('/:id', user);
// api/profile/smallImg
router.post('/smallImg', authMiddleware, saveSmallPhoto);
// api/profile/bigImg
router.post('/bigImg', authMiddleware, saveBigPhoto);
// api/profile/status
router.post('/status', authMiddleware, setStatus);
// api/profile/city
router.post('/city', authMiddleware, setCity);
// api/profile/birth
router.post('/birth', authMiddleware, setBirth);
// api/profile/education
router.post('/education', authMiddleware, setEducation);
// api/profile/phone
router.post('/phone', authMiddleware, setPhone);
// api/profile/book
router.post('/book', authMiddleware, setBook);


export default router;