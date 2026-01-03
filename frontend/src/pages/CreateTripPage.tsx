import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripAPI } from '../lib/api';

export default function CreateTripPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await tripAPI.create({ name, description, startDate, endDate });
            navigate(`/trips/${data.id}/itinerary`);
        } catch (error) {
            console.error('Error creating trip:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: 'var(--spacing-2xl)' }}>
            <div className="container">
                <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>✈️ Create New Trip</h1>
                <div className="card" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>Trip Name</label>
                            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Europe Adventure" required />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>Description</label>
                            <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Exploring historic cities..." rows={3} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>Start Date</label>
                                <input className="input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>End Date</label>
                                <input className="input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Trip'}</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
