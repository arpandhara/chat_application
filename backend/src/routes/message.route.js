import express from 'express';
import { getAllContacts, getMessagesByUserId, sendMessage , getChatPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const messageRoute = express.Router();


messageRoute.use(arcjetProtection,protectRoute)

messageRoute.get("/contacts" , getAllContacts);
messageRoute.get("/chats" , getChatPartners);
messageRoute.get("/:id" , getMessagesByUserId);
messageRoute.post("/send/:id" , sendMessage);



export default messageRoute