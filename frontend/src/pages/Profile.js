import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiGlobe, FiClock, FiCamera, FiSave, FiLogOut, FiBell, FiBook, FiLock, FiArrowUpRight, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { meta } from '../data/content';
import PageHero from '../components/PageHero';
import './auth.css';
import './profile.css';
import { ease } from '../utils/motion';

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

  // Status → tokenised pill modifier (see profile.css)
  const getStatusBadge = (status) => {
    const badges = {
      pending: 'profile-status--pending',
      approved: 'profile-status--approved',
      denied: 'profile-status--denied',
      rescheduled: 'profile-status--rescheduled',
      completed: 'profile-status--completed',
    };
    return badges[status] || 'profile-status--completed';
  };

  if (authLoading || !profile) {
    return (
      <div className="page-loader" role="status" aria-live="polite">
        <span>Loading…</span>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="profile-page page-transition">
      <PageHero
        compact
        eyebrow="Your account"
        uk="Кабінет"
        title={<em>{profile.name}</em>}
        lede={profile.email}
        aside={
          <div className="profile-avatar">
            <div className="profile-avatar__frame">
              {profile.picture ? (
                <img src={profile.picture} alt={profile.name} />
              ) : (
                <FiUser aria-hidden="true" />
              )}
            </div>
            <label className="profile-avatar__upload" aria-label="Upload profile photo">
              <FiCamera aria-hidden="true" />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
            </label>
          </div>
        }
      >
        <div className="profile-actions">
          {profile.role === 'admin' && <span className="chip">Admin</span>}
          {profile.role === 'admin' && (
            <button type="button" onClick={() => navigate('/admin')} className="btn-primary">
              Admin Dashboard <FiArrowUpRight />
            </button>
          )}
          <button type="button" onClick={handleLogout} className="btn-outline">
            <FiLogOut />
            Logout
          </button>
        </div>
      </PageHero>

      <section className="page-section profile-section">
        <div className="section-shell">
          {/* Tabs */}
          <div className="profile-tabs" role="tablist">
            {[
              { id: 'profile', label: 'Profile', icon: FiUser },
              { id: 'bookings', label: 'My Bookings', icon: FiBook },
              { id: 'notifications', label: 'Notifications', icon: FiBell, badge: unreadCount },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`profile-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              >
                <tab.icon aria-hidden="true" />
                {tab.label}
                {tab.badge > 0 && <span className="profile-tab__badge">{tab.badge}</span>}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="profile-panel"
          >
            {activeTab === 'profile' && (
              <div>
                <header className="profile-panel__head">
                  <div>
                    <p className="eyebrow">Settings</p>
                    <h2>Profile Settings</h2>
                  </div>
                  {!editing ? (
                    <button type="button" onClick={() => setEditing(true)} className="btn-outline profile-btn-sm">
                      Edit
                    </button>
                  ) : (
                    <div className="profile-panel__buttons">
                      <button type="button" onClick={() => setEditing(false)} className="btn-outline profile-btn-sm">
                        Cancel
                      </button>
                      <button type="button" onClick={handleSave} disabled={saving} className="btn-primary profile-btn-sm">
                        <FiSave />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  )}
                </header>

                <div className="profile-fields">
                  <div>
                    <label className="field-label profile-label" htmlFor="profile-name">
                      <FiUser aria-hidden="true" /> Name
                    </label>
                    <input
                      id="profile-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editing}
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="field-label profile-label" htmlFor="profile-email">
                      <FiMail aria-hidden="true" /> Email
                    </label>
                    <input id="profile-email" type="email" value={profile.email} disabled className="field" />
                  </div>

                  <div>
                    <label className="field-label profile-label" htmlFor="profile-language">
                      <FiGlobe aria-hidden="true" /> Language Learning
                    </label>
                    <select
                      id="profile-language"
                      value={formData.language_learning}
                      onChange={(e) => setFormData({ ...formData, language_learning: e.target.value })}
                      disabled={!editing}
                      className="field"
                    >
                      <option value="">Select language</option>
                      <option value="ukrainian">Ukrainian</option>
                      <option value="russian">Russian</option>
                      <option value="english">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="field-label profile-label" htmlFor="profile-timezone">
                      <FiClock aria-hidden="true" /> Timezone
                    </label>
                    <select
                      id="profile-timezone"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      disabled={!editing}
                      className="field"
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
                  <div className="profile-password">
                    <div className="profile-password__aside">
                      <p className="eyebrow">Security</p>
                      <h3>
                        <FiLock aria-hidden="true" /> Change Password
                      </h3>
                    </div>

                    <div className="profile-password__fields">
                      <div>
                        <label className="field-label" htmlFor="profile-current-password">Current Password</label>
                        <input
                          id="profile-current-password"
                          type="password"
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                          className="field"
                        />
                      </div>

                      <div>
                        <label className="field-label" htmlFor="profile-new-password">New Password</label>
                        <input
                          id="profile-new-password"
                          type="password"
                          value={passwordData.new_password}
                          onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                          className="field"
                        />
                      </div>

                      <div>
                        <label className="field-label" htmlFor="profile-confirm-password">Confirm New Password</label>
                        <input
                          id="profile-confirm-password"
                          type="password"
                          value={passwordData.confirm_password}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                          className="field"
                        />
                      </div>

                      {passwordError && (
                        <div className="auth-alert" role="alert">
                          <FiAlertCircle aria-hidden="true" />
                          <span>{passwordError}</span>
                        </div>
                      )}

                      {passwordSuccess && (
                        <div className="auth-alert auth-alert--ok" role="status">
                          <FiCheck aria-hidden="true" />
                          <span>{passwordSuccess}</span>
                        </div>
                      )}

                      <button type="button" onClick={handleChangePassword} className="btn-primary">
                        <FiLock />
                        Change Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <header className="profile-panel__head">
                  <div>
                    <p className="eyebrow">Lessons</p>
                    <h2>My Bookings</h2>
                  </div>
                </header>
                {bookings.length === 0 ? (
                  <p className="profile-empty">
                    No bookings yet.{' '}
                    <a href="/booking" className="link-underline">
                      Book a lesson
                    </a>
                  </p>
                ) : (
                  <ul className="profile-list">
                    {bookings.map(booking => (
                      <li key={booking.booking_id} className="profile-booking">
                        <div>
                          <h3>{booking.package_name}</h3>
                          <p className="profile-booking__meta">
                            ${booking.amount} • {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                          {booking.admin_notes && (
                            <p className="profile-booking__note">Note: {booking.admin_notes}</p>
                          )}
                          {booking.suggested_datetime && (
                            <p className="profile-booking__suggested">
                              Suggested time: {booking.suggested_datetime}
                            </p>
                          )}
                        </div>
                        <span className={`profile-status ${getStatusBadge(booking.booking_status)}`}>
                          {booking.booking_status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <header className="profile-panel__head">
                  <div>
                    <p className="eyebrow">Inbox</p>
                    <h2>Notifications</h2>
                  </div>
                </header>
                {notifications.length === 0 ? (
                  <p className="profile-empty">No notifications yet.</p>
                ) : (
                  <ul className="profile-list">
                    {notifications.map(notification => (
                      <li
                        key={notification.notification_id}
                        onClick={() => !notification.read && markNotificationRead(notification.notification_id)}
                        className={`profile-note ${notification.read ? '' : 'is-unread'}`}
                      >
                        <div>
                          <h3>{notification.title}</h3>
                          <p>{notification.message}</p>
                        </div>
                        <span className="profile-note__date">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
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
