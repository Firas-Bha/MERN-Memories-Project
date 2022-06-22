import express from 'express';
import {signin,signup} from '../controllers/user.js';

const router = express.Router();

router.post('/signin',signin); // post to send the data to the backend
router.post('/signup',signup); 
export default router;