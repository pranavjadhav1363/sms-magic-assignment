import React from 'react';
import { Menu, HelpCircle, CreditCard, User } from 'lucide-react';  

// import './Header.css'; // Assuming you have a CSS file for additional styles




const  Header = () => {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="text-black" size={20} />
          </div>

          <div className="flex items-center space-x-4">
            <HelpCircle className="text-gray-400" size={20} />
            <CreditCard className="text-gray-400" size={20} />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium">
                <User size={16} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-500">Admin</span>
                <span className="text-sm text-gray-700 font-medium">Pranav</span>
              </div>
            </div>
          </div>
        </div>
    );
}   

export default Header;