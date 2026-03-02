import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiGlobe, FiClock, FiCamera, FiSave, FiLogOut, FiBell, FiBook, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { meta } from '../data/content';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, updateUser, loading: authLoading } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    language_learning: '',
    timezone: '',
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    document.title = `Profile | ${meta.title}`;
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      fetchProfile();
      fetchNotifications();
      fetchBookings();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/profile`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name || '',
          language_learning: data.language_learning || '',
          timezone: data.timezone || 'UTC',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/notifications`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/bookings`, {
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        updateUser(data);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/profile/picture`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({ ...prev, picture: data.picture }));
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const markNotificationRead = async (notificationId) => {
    try {
      await fetch(`${BACKEND_URL}/api/users/notifications/${notificationId}/read`, {
        method: 'PUT',
        credentials: 'include',
      });
      setNotifications(prev =>
        prev.map(n => n.notification_id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification read:', error);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!passwordData.current_password || !passwordData.new_password) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (passwordData.new_password.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess('Password changed successfully!');
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
      } else {
        setPasswordError(data.detail || 'Failed to change password');
      }
    } catch (error) {
      setPasswordError('An error occurred. Please try again.');
      console.error('Error changing password:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      denied: 'bg-red-100 text-red-800',
      rescheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent"></div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="page-transition pt-24 pb-16">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Photo */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--color-bg-secondary)]">
                  {profile.picture ? (
                    <img src={profile.picture} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiUser className="w-12 h-12 text-[var(--color-text-secondary)]" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--color-accent-hover)] transition-colors">
                  <FiCamera className="w-4 h-4 text-white" />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-serif font-bold">{profile.name}</h1>
                <p className="text-[var(--color-text-secondary)]">{profile.email}</p>
                {profile.role === 'admin' && (
                  <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    Admin
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {profile.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="btn-primary flex items-center gap-2"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-outline flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-50"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile', icon: FiUser },
              { id: 'bookings', label: 'My Bookings', icon: FiBook },
              { id: 'notifications', label: 'Notifications', icon: FiBell, badge: unreadCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.badge > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-serif font-bold">Profile Settings</h2>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="btn-outline text-sm">
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(false)} className="btn-outline text-sm">
                        Cancel
                      </button>
                      <button onClick={handleSave} disabled={saving} className="btn-primary text-sm flex items-center gap-2">
                        <FiSave className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FiUser className="w-4 h-4" /> Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FiMail className="w-4 h-4" /> Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FiGlobe className="w-4 h-4" /> Language Learning
                    </label>
                    <select
                      value={formData.language_learning}
                      onChange={(e) => setFormData({ ...formData, language_learning: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] disabled:opacity-60"
                    >
                      <option value="">Select language</option>
                      <option value="ukrainian">Ukrainian</option>
                      <option value="russian">Russian</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FiClock className="w-4 h-4" /> Timezone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] disabled:opacity-60"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (US)</option>
                      <option value="America/Los_Angeles">Pacific Time (US)</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Europe/Kiev">Kyiv</option>
                      <option value="Europe/Moscow">Moscow</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                </div>

                {/* Change Password Section - Only for email/password users */}
                {profile.auth_provider === 'email' && (
                  <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                      <FiLock className="w-5 h-5" /> Change Password
                    </h3>
                    
                    <div className="grid gap-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <input
                          type="password"
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <input
                          type="password"
                          value={passwordData.new_password}
                          onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordData.confirm_password}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]"
                        />
                      </div>

                      {passwordError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {passwordError}
                        </div>
                      )}

                      {passwordSuccess && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                          {passwordSuccess}
                        </div>
                      )}

                      <button
                        onClick={handleChangePassword}
                        className="btn-primary flex items-center gap-2 justify-center"
                      >
                        <FiLock className="w-4 h-4" />
                        Change Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-serif font-bold mb-4">My Bookings</h2>
                {bookings.length === 0 ? (
                  <p className="text-[var(--color-text-secondary)] text-center py-8">
                    No bookings yet. <a href="/booking" className="text-[var(--color-accent)]">Book a lesson</a>
                  </p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map(booking => (
                      <div key={booking.booking_id} className="p-4 border border-[var(--color-border)] rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{booking.package_name}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                              ${booking.amount} • {new Date(booking.created_at).toLocaleDateString()}
                            </p>
                            {booking.admin_notes && (
                              <p className="text-sm mt-2 p-2 bg-[var(--color-bg-secondary)] rounded">
                                Note: {booking.admin_notes}
                              </p>
                            )}
                            {booking.suggested_datetime && (
                              <p className="text-sm mt-1 text-blue-600">
                                Suggested time: {booking.suggested_datetime}
                              </p>
                            )}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.booking_status)}`}>
                            {booking.booking_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-serif font-bold mb-4">Notifications</h2>
                {notifications.length === 0 ? (
                  <p className="text-[var(--color-text-secondary)] text-center py-8">
                    No notifications yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div
                        key={notification.notification_id}
                        onClick={() => !notification.read && markNotificationRead(notification.notification_id)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          notification.read
                            ? 'bg-[var(--color-bg-secondary)]'
                            : 'bg-pink-50 border-l-4 border-[var(--color-accent)]'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
