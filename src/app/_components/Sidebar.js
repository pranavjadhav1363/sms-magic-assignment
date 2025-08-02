 const sidebarItems = [
    { icon: Bell, label: 'Notifications', active: false },
    { icon: Calendar, label: 'Calendar', active: false },
    { icon: Users, label: 'Users', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: MessageSquare, label: 'Campaign', active: true },
    { icon: Share2, label: 'Share', active: false },
    { icon: Database, label: 'Database', active: false },
    { icon: Lightbulb, label: 'Ideas', active: false },
    { icon: Heart, label: 'Favorites', active: false }
  ];

import React from 'react';
import { Bell, Calendar, Users, BarChart3, MessageSquare, Share2, Database, Lightbulb, Heart } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {     
    return (  
        <div className="w-16 bg-slate-800 fixed top-0 left-0 bottom-0 flex flex-col items-center py-4 space-y-4 z-50">
        {/* Logo */}
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-3 mt-1">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${item.active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                }`}
            >
              <item.icon size={20} />
            </div>
          ))}
        </div>
      </div>  
    )};
 
export default Sidebar;