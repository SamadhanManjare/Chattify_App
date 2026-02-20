import express from 'express';
import { getAllContacts, getMessagesByUserId, sendMessages, getchatPartners} from '../controllers/msg.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import arcjetProtection from '../middleware/arcjet.middleware.js';

const router = express.Router();

// Apply Arcjet protection and authentication middleware to all routes in this router

router.use(arcjetProtection, protectRoute); // Apply authentication middleware to all routes in this router

router.get('/contacts' , getAllContacts);
router.get('/chats' , getchatPartners);
router.get('/:id', getMessagesByUserId);
router.post('/send/:id', sendMessages);





export default router;