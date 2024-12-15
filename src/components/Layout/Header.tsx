import React from 'react';
import { useAuthStore } from '../../store/auth';
import { LogOut, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Logo from '../Logo';
import NotificationBell from '../NotificationBell';

interface HeaderProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ onMenuClick, onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-700 rounded-lg lg:hidden"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-6 h-6" />
            ) : (
              <PanelLeftOpen className="w-6 h-6" />
            )}
          </button>
          <div className="lg:hidden">
            <Logo variant="light" size="sm" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;