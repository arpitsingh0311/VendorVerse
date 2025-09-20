// src/components/CreateEventModal.jsx
import axios from 'axios';
import { useState } from 'react';


const CreateEventModal = ({ onClose, onEventCreated }) => {
    const [inputs, setInputs] = useState({
        eventName: '',
        eventType: '',
        eventDate: '',
        budget: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/events/create', inputs, { withCredentials: true });
            console.log(res.data);
            onEventCreated(res.data);
            onClose();
        } catch (error) {
            console.error("Failed to create event", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create a New Event</h2>

                <input
                    type="text"
                    placeholder="Event Name (e.g., John & Jane's Wedding)"
                    value={inputs.eventName}
                    onChange={e => setInputs({ ...inputs, eventName: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Event Type (e.g., Wedding, Birthday)"
                    value={inputs.eventType}
                    onChange={e => setInputs({ ...inputs, eventType: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="date"
                    value={inputs.eventDate}
                    onChange={e => setInputs({ ...inputs, eventDate: e.target.value })}
                    className="w-full p-2 mb-3 border rounded text-gray-500"
                    required
                />
                {/* ✅ This was the missing input field */}
                <input
                    type="number"
                    placeholder="Budget ($)"
                    value={inputs.budget}
                    onChange={e => setInputs({ ...inputs, budget: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                />

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Create Event</button>
                <button type="button" onClick={onClose} className="w-full p-2 mt-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors">Cancel</button>
            </form>
        </div>
    );
};

export default CreateEventModal;