import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiCheck, FiX, 
  FiClock, FiRefreshCw, FiMessageSquare, FiArrowLeft 
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { meta } from '../../data/content';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    booking_status: '',
    admin_notes: '',
    suggested_datetime: '',
  });

  useEffect(() => {
    document.title = `Admin Dashboard | ${meta.title}`;
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/profile');
      } else {
        fetchStats();
        fetchBookings();
      }
    }
  }, [user, authLoading, isAdmin, navigate, filter]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/bookings/stats`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const url = filter === 'all' 
        ? `${BACKEND_URL}/api/admin/bookings`
        : `${BACKEND_URL}/api/admin/bookings?status=${filter}`;
      
      const response = await fetch(url, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleUpdateBooking = async (bookingId, status) => {
    setActionLoading(bookingId);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          booking_status: status,
          admin_notes: updateForm.admin_notes || null,
          suggested_datetime: updateForm.suggested_datetime || null,
        }),
      });
      
      if (response.ok) {
        fetchBookings();
        fetchStats();
        setSelectedBooking(null);
        setUpdateForm({ booking_status: '', admin_notes: '', suggested_datetime: '' });
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const quickAction = async (bookingId, status) => {
    setActionLoading(bookingId);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ booking_status: status }),
      });
      
      if (response.ok) {
        fetchBookings();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      denied: 'bg-red-100 text-red-800',
      rescheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      refund_pending: 'bg-orange-100 text-orange-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="page-transition pt-24 pb-16">
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('/profile')}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] flex items-center gap-2 mb-2"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Profile
              </button>
              <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
              <p className="text-[var(--color-text-secondary)]">Manage lesson bookings and users</p>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'Total', value: stats.total, icon: FiCalendar, color: 'bg-gray-100' },
                { label: 'Pending', value: stats.pending, icon: FiClock, color: 'bg-yellow-100' },
                { label: 'Approved', value: stats.approved, icon: FiCheck, color: 'bg-green-100' },
                { label: 'Denied', value: stats.denied, icon: FiX, color: 'bg-red-100' },
                { label: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: FiDollarSign, color: 'bg-purple-100' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${stat.color} p-4 rounded-xl`}
                >
                  <stat.icon className="w-6 h-6 mb-2 opacity-60" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {['pending', 'approved', 'denied', 'rescheduled', 'completed', 'all'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors whitespace-nowrap ${
                  filter === status
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="card overflow-hidden">
            {bookings.length === 0 ? (
              <div className="p-8 text-center text-[var(--color-text-secondary)]">
                No bookings found with status: {filter}
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {bookings.map(booking => (
                  <div key={booking.booking_id} className="p-4 hover:bg-[var(--color-bg-secondary)] transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium">{booking.user_name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.booking_status)}`}>
                            {booking.booking_status}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          {booking.user_email}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">{booking.package_name}</span> • ${booking.amount}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          {new Date(booking.created_at).toLocaleString()}
                        </p>
                        {booking.admin_notes && (
                          <p className="text-sm mt-1 text-[var(--color-text-secondary)]">
                            Note: {booking.admin_notes}
                          </p>
                        )}
                      </div>

                      {/* Quick Actions */}
                      {booking.booking_status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => quickAction(booking.booking_id, 'approved')}
                            disabled={actionLoading === booking.booking_id}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            <FiCheck className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => quickAction(booking.booking_id, 'denied')}
                            disabled={actionLoading === booking.booking_id}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                          >
                            <FiX className="w-4 h-4" />
                            Deny
                          </button>
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                          >
                            <FiRefreshCw className="w-4 h-4" />
                            Reschedule
                          </button>
                        </div>
                      )}

                      {booking.booking_status === 'approved' && (
                        <button
                          onClick={() => quickAction(booking.booking_id, 'completed')}
                          disabled={actionLoading === booking.booking_id}
                          className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                          <FiCheck className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reschedule Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[var(--color-bg)] rounded-xl p-6 max-w-md w-full"
              >
                <h2 className="text-xl font-serif font-bold mb-4">Reschedule Booking</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {selectedBooking.user_name} - {selectedBooking.package_name}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Suggested Date/Time</label>
                    <input
                      type="datetime-local"
                      value={updateForm.suggested_datetime}
                      onChange={(e) => setUpdateForm({ ...updateForm, suggested_datetime: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Note for Student</label>
                    <textarea
                      value={updateForm.admin_notes}
                      onChange={(e) => setUpdateForm({ ...updateForm, admin_notes: e.target.value })}
                      placeholder="e.g., I'm available on Tuesday at 3pm instead..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setSelectedBooking(null);
                      setUpdateForm({ booking_status: '', admin_notes: '', suggested_datetime: '' });
                    }}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateBooking(selectedBooking.booking_id, 'rescheduled')}
                    disabled={actionLoading}
                    className="flex-1 btn-primary"
                  >
                    {actionLoading ? 'Sending...' : 'Send Reschedule Request'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
