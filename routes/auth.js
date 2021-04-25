import {Router} from 'express';
import { login, register, verify } from '../controllers/auth.js';
import {check} from 'express-validator'; 
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();

// api/auth/register
router.post('/register', [
    check('email', 'Введіть будь ласка коректний e-mail').isEmail().escape(),
    check('password', 'Введіть будь ласка пароль').trim().isLength({ min: 1 }).escape(),
    check('name', 'Введіть будь ласка ім\'я').trim().isLength({ min: 1 }).escape(),
    check('surname', 'Введіть будь ласка прізвище').trim().isLength({ min: 1 }).escape(),
    check('city', 'Введіть будь ласка місто').trim().isLength({ min: 1 }).escape(),
], register);


// api/auth/login
router.post('/login', [
    check('email', 'Введіть будь ласка коректний e-mail').normalizeEmail().isEmail().escape(),
    check('password', 'Введіть будь ласка пароль').exists().escape()
], login);

// api/auth/verify
router.get('/verify', authMiddleware, verify);


export default router;