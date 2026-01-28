"use client";

import { useState } from "react";
import { X, Mail, Save } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface UpdateEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateEmailModal({ isOpen, onClose }: UpdateEmailModalProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    currentEmail: user?.email || "",
    newEmail: "",
    confirmEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newEmail !== formData.confirmEmail) {
      alert("New email addresses don't match!");
      return;
    }

    if (formData.newEmail === formData.currentEmail) {
      alert("New email must be different from current email!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.newEmail)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement email update API call
      console.log("Email update:", { 
        currentEmail: formData.currentEmail, 
        newEmail: formData.newEmail,
        password: formData.password 
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert("Email updated successfully! Please check your new email for verification.");
      onClose();
    } catch (error) {
      alert("Failed to update email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Update Email Address</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Current Email */}
            <div>
              <label htmlFor="currentEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  id="currentEmail"
                  name="currentEmail"
                  value={formData.currentEmail}
                  disabled
                  className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* New Email */}
            <div>
              <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                  placeholder="Enter new email address"
                />
              </div>
            </div>

            {/* Confirm Email */}
            <div>
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                  placeholder="Confirm new email address"
                />
              </div>
            </div>

            {/* Password Confirmation */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <X className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                  placeholder="Enter current password to confirm"
                />
              </div>
            </div>

            {/* Email Update Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Important:</p>
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <li>• You'll receive a verification email at your new address</li>
                <li>• Your current email will remain active until verified</li>
                <li>• Please check your spam folder if needed</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-light text-white rounded-lg hover:bg-blue-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}