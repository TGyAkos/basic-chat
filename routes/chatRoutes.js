import express from 'express';
import {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
} from '../controllers/chatController.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;