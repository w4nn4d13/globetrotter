import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { tripAPI, searchAPI } from '../lib/api';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [trips, setTrips] = useState<any[]>([]);
    const [popularCities, setPopularCities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tripsRes, citiesRes] = await Promise.all([
                    tripAPI.getAll(),
                    searchAPI.getPopularCities(6),
                ]);
                setTrips(tripsRes.data.slice(0, 3));
                setPopularCities(citiesRes.data);
            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Navbar */}
            <nav style={{ background: 'var(--bg-secondary)', padding: 'var(--spacing-md)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="gradient-text">GlobalTrotters</h2>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.name}!</span>
                        <button className="btn btn-secondary" onClick={() => navigate('/trips')}>My Trips</button>
                        {user?.role === 'admin' && <button className="btn btn-secondary" onClick={() => navigate('/admin')}>Admin</button>}
                        <button className="btn btn-secondary" onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-md)' }}>
                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: 'var(--spacing-md)' }}>
                        <span className="gradient-text">Plan Your Next Adventure</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: 'var(--spacing-xl)' }}>
                        Create detailed itineraries, track budgets, and share your trips
                    </p>
                    <button className="btn btn-primary" style={{ fontSize: '1rem', padding: 'var(--spacing-md) var(--spacing-xl)' }}
                        onClick={() => navigate('/trips/create')}>
                        ✈️ Plan New Trip
                    </button>
                </div>

                {/* Recent Trips */}
                {!loading && trips.length > 0 && (
                    <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Your Recent Trips</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                            {trips.map((trip) => (
                                <div key={trip.id} className="card" onClick={() => navigate(`/trips/${trip.id}/itinerary`)} style={{ cursor: 'pointer' }}>
                                    <h3>{trip.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 'var(--spacing-sm)' }}>
                                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)', fontSize: '0.875rem' }}>
                                        <span>🌍 {trip.stopCount || 0} cities</span>
                                        <span>💰 ${trip.estimatedCost || 0}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Popular Destinations */}
                {!loading && popularCities.length > 0 && (
                    <div>
                        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Popular Destinations</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
                            {popularCities.map((city) => (
                                <div key={city.id} className="card" style={{ background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${city.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                    <h3>{city.name}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{city.country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
