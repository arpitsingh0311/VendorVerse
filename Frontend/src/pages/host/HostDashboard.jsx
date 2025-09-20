import { useEffect, useState } from 'react';
import CreateEventModal from '../../components/CreateEventModal.jsx';
import axios from 'axios';

const HostDashboard = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/events/my-events', { withCredentials: true });
                setEvents(res.data);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Events</h1>
                <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    + Create Event
                </button>
            </div>

            {/* Event List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                    events.map(event => (
                        <div key={event._id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-bold text-lg">{event.eventName}</h3>
                            <p className="text-gray-600">{new Date(event.eventDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>You haven't created any events yet.</p>
                )}
            </div>

            {showModal && (
                <CreateEventModal
                    onClose={() => setShowModal(false)}
                    onEventCreated={(newEvent) => {
                        setEvents([...events, newEvent]);
                    }}
                />
            )}
        </div>
    );
};
export default HostDashboard;