import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Eye, EyeOff, UserCog } from 'lucide-react';
import { format } from 'date-fns';

const Admin = () => {
  const { users, user: currentUser, resetUserPassword } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  const handleResetPassword = async (username: string) => {
    await resetUserPassword(username);
    setSelectedUser(null);
  };

  const togglePasswordVisibility = (username: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Password Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.username} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserCog className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium">{u.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono">
                      {showPasswords[u.username] ? u.password : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(u.username)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords[u.username] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    u.username.toLowerCase() === 'jamie' 
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {u.username.toLowerCase() === 'jamie' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    u.requiresPasswordChange
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {u.requiresPasswordChange ? 'Password Change Required' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {u.lastPasswordChange 
                    ? format(new Date(u.lastPasswordChange), 'dd MMM yyyy HH:mm')
                    : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {selectedUser === u.username ? (
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleResetPassword(u.username)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Confirm Reset
                      </button>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedUser(u.username)}
                      className="text-blue-600 hover:text-blue-900"
                      disabled={u.username === currentUser.username}
                    >
                      Reset Password
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;