"use client";

import { useState } from "react";
import { Settings, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { updatePassword } from "@/actions/settings";

type MessageType = {
  type: "success" | "error";
  text: string;
};

export default function SettingsClientPage() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [passwordMessage, setPasswordMessage] = useState<MessageType | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "New password must be at least 6 characters" });
      return;
    }

    setIsPasswordLoading(true);

    try {
      const formData = new FormData();
      formData.append("currentPassword", passwordForm.currentPassword);
      formData.append("newPassword", passwordForm.newPassword);

      const result = await updatePassword(null, formData);

      if (result.error) {
        setPasswordMessage({ type: "error", text: result.error });
      } else {
        setPasswordMessage({ type: "success", text: result.success || "Password updated successfully" });
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setPasswordMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-700 border border-brand-100">
            <Settings className="w-5 h-5" />
          </div>
          <h1 className="text-heading-2 text-neutral-900">Account Settings</h1>
        </div>
        <p className="text-body text-neutral-500">Manage your account preferences and settings</p>
      </div>

      <div className="flex justify-center">
        {/* Password Update Section */}
        <div className="bg-neutral-0 border border-neutral-200 shadow-sm w-full max-w-lg">
          <div className="h-1 w-full bg-brand-600"></div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-brand-50 text-brand-700 border border-brand-100">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-heading-4 text-neutral-900">Change Password</h2>
                <p className="text-caption text-neutral-500">Update your account password</p>
              </div>
            </div>

            {passwordMessage && (
              <div
                className={`mb-4 p-3 border flex items-center gap-2 ${
                  passwordMessage.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {passwordMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="text-caption">{passwordMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="currentPassword"
                  className="block text-caption text-neutral-700 font-medium"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword || ""}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="block text-caption text-neutral-700 font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-caption text-neutral-700 font-medium"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={isPasswordLoading}
                className="w-full bg-brand-600 text-neutral-0 py-2.5 px-4 text-body font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPasswordLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
