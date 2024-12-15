import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Receipt,
  FolderOpen,
  Settings,
  UserSquare2,
  X,
  Shield,
  Car
} from 'lucide-react';
import Logo from '../Logo';
import { useAuthStore } from '../../store/auth';

interface SidebarProps {
  onClose: () => void;
  isCollapsed: boolean;
}

const Sidebar = ({ onClose, isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuthStore();
  
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/leads', icon: UserSquare2, label: 'Leads' },
    { to: '/customers', icon: Users, label: 'Customers' },
    { to: '/vehicles', icon: Car, label: 'Vehicles' },
    { to: '/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/estimates', icon: FileText, label: 'Estimates' },
    { to: '/invoices', icon: Receipt, label: 'Invoices' },
    { to: '/files', icon: FolderOpen, label: 'Files' },
    { to: '/settings', icon: Settings, label: 'Settings' },
    ...(user?.role === 'admin' ? [{ to: '/admin', icon: Shield, label: 'Admin' }] : []),
  ];

  return (
    <div className="h-full flex flex-col">
      <div className={`flex items-center justify-between p-4 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && <Logo variant="light" size="lg" />}
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white rounded-lg lg:hidden"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;