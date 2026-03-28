import { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { LogoutConfirmDialog } from '../components/ui/ConfirmDialog';
import Modal, { FormInput, ModalActions } from '../components/ui/Modal';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../lib/apiClient';

export default function Settings() {
  const { user, logout } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-xs sm:text-sm text-gray-500">Manage your account preferences and settings</p>
      </div>

      <div className="max-w-4xl space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <div className="card p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-600" />
            Profile
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-semibold flex-shrink-0">
                  {getUserInitials()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user?.name || 'Loading...'}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email || ''}</p>
                {user?.mobile && <p className="text-xs sm:text-sm text-gray-500 truncate">{user.mobile}</p>}
              </div>
            </div>
            <button onClick={() => setIsEditProfileOpen(true)} className="btn-secondary min-h-[44px] w-full sm:w-auto justify-center">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card p-4 sm:p-6 border-red-200 bg-red-50/30">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <LogOut className="w-5 h-5 text-red-600" />
            Account Actions
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 bg-white rounded-xl">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm sm:text-base">Logout</p>
              <p className="text-xs sm:text-sm text-gray-500">Sign out of your account</p>
            </div>
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className="btn-danger min-h-[44px] w-full sm:w-auto justify-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-sm text-gray-400">App Version 1.0.0</p>
        </div>
      </div>

      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />

      <LogoutConfirmDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={async () => {
          setIsLogoutDialogOpen(false);
          await logout();
        }}
      />
    </div>
  );
}

function EditProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({ name: user?.name || '', mobile: user?.mobile || '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await apiClient.patch('/users/profile', formData);
      await refreshUser();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" icon="✏️" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
          <FormInput label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormInput label="Email Address" type="email" value={user?.email || ''} disabled />
          <FormInput label="Mobile Number" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} placeholder="+91 98765 43210" />
          <ModalActions onCancel={onClose} submitLabel="Save Changes" isLoading={isSubmitting} />
        </div>
      </form>
    </Modal>
  );
}
