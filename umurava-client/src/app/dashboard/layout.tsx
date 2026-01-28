"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Settings, 
  LogOut,
  User,
  Bell,
  ChevronDown,
  Camera,
  Lock,
  Mail,
  Edit,
  Moon,
  Sun,
  X
} from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { logoutUser, initializeAuth } from "@/store/authSlice";
import { useTheme } from "@/contexts/ThemeContext";
import ProfileModal from "@/components/dashboard/ProfileModal";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";
import UpdateEmailModal from "@/components/dashboard/UpdateEmailModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-light"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/dashboard', icon: LayoutDashboard },
    { name: 'Challenges', href: '/dashboard/challenges', icon: Trophy },
    { name: 'Community', href: '/dashboard/community', icon: Users },
  ];

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
    setShowProfileMenu(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement actual image upload to server
      console.log('Uploading image:', file);
      // For now, just show success message
      alert('Image upload functionality will be implemented with backend integration');
    }
  };

  const handleUpdateEmail = () => {
    setShowEmailModal(true);
    setShowProfileMenu(false);
  };

  const profileMenuItems = [
    { 
      name: 'Upload Photo', 
      icon: Camera, 
      action: handleUploadPhoto
    },
    { 
      name: 'Change Password', 
      icon: Lock, 
      action: () => {
        setShowPasswordModal(true);
        setShowProfileMenu(false);
      }
    },
    { 
      name: 'Update Email', 
      icon: Mail, 
      action: handleUpdateEmail
    },
    { 
      name: 'Account Settings', 
      icon: Settings, 
      action: () => {
        setShowAccountSettings(true);
        setShowProfileMenu(false);
      }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-blue-light dark:text-blue-400">TalentBridge</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col px-6 py-6">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex gap-x-3 rounded-md p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-light dark:hover:text-blue-400 transition-colors"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex w-full items-center gap-x-3 rounded-md p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-light dark:bg-blue-600 text-white font-semibold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {profileMenuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      {item.name}
                    </button>
                  ))}
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex-1"></div>
            <div className="flex items-center gap-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 relative transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <p className="text-sm text-gray-900 dark:text-gray-100">New challenge available</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <p className="text-sm text-gray-900 dark:text-gray-100">Your challenge was approved</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <p className="text-sm text-gray-900 dark:text-gray-100">Welcome to TalentBridge!</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm text-blue-light dark:text-blue-400 hover:text-blue-dark dark:hover:text-blue-300 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {children}
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(showProfileMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

      {/* Modals */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
      <ChangePasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
      <UpdateEmailModal 
        isOpen={showEmailModal} 
        onClose={() => setShowEmailModal(false)} 
      />
      
      {/* Account Settings Modal */}
      {showAccountSettings && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowAccountSettings(false)} />
            
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Account Settings</h2>
                <button
                  onClick={() => setShowAccountSettings(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-light dark:bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User Profile</p>
                  </div>
                </div>

                {/* User Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {user?.firstName || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {user?.lastName || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {user?.email || 'Not set'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      User ID
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {user?.id || 'Not available'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Account Status
                    </label>
                    <p className="text-sm text-green-600 dark:text-green-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      Active
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Member Since
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setShowAccountSettings(false);
                      setShowProfileModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-light text-white rounded-lg hover:bg-blue-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowAccountSettings(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}