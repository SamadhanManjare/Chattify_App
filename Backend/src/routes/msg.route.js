import express from 'express';
import { getAllContacts, getMessagesByUserId, sendMessages} from '../controllers/msg.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/contacts', protectRoute, getAllContacts);
router.get('/chat', getchatPartners);

router.get('/:id',protectRoute, getMessagesByUserId);

router.post('/send/:id',protectRoute, sendMessages);


// router.get('/receive', (req, res) => {
//     res.send('receive Messages endpoint');
// })


export default router;