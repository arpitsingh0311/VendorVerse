// server/routes/event.routes.js
import express from 'express';
import protectRoute from '../middleware/protectedRoute.js';
import { createEvent, getMyEvents } from '../controllers/event.controller.js';

const router = express.Router();

// This line applies protection to ALL routes defined in this file.
router.use(protectRoute);

router.post('/create', createEvent);
router.get('/my-events', getMyEvents);

export default router;