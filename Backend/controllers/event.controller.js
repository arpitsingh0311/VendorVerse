// server/controllers/event.controller.js
import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
    try {
        const { eventName, eventType, eventDate, budget } = req.body;
        const hostId = req.user._id;

        if (!eventName || !eventDate) {
            return res.status(400).json({ error: "Event name and date are required." });
        }
        const newEvent = new Event({ host: hostId, eventName, eventType, eventDate, budget });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("--- ERROR IN createEvent ---", error);
        res.status(500).json({ error: "Server error creating event." });
    }
};

export const getMyEvents = async (req, res) => {
    try {
        const hostId = req.user._id;
        const events = await Event.find({ host: hostId }).sort({ eventDate: 1 });
        res.status(200).json(events);
    } catch (error) {
        console.error("--- ERROR IN getMyEvents ---", error);
        res.status(500).json({ error: "Server error fetching events." });
    }
};