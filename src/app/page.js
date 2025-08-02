'use client';
import React, { useState } from 'react';
{/* <Megaphone /> */ }
import
{
  Search,
  Filter,
  MoreHorizontal,
  Megaphone,
  Plus,
  Bell,
  Calendar,
  Users,
  BarChart3,
  MessageSquare,
  Share2,
  Database,
  Lightbulb,
  Heart,
  ChevronRight,
  Grid3X3,
  List,
  Menu,
  HelpCircle,
  CreditCard,
  History,
  Timer,
  User
} from 'lucide-react';
import CampaignCalendar from './_components/CampaignCalendar';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import Pagination from './_components/Pagination';
import Tablecontent from './_components/Tablecontent';


export default function CampaignDashboard()
{

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const [selectedTab, setSelectedTab] = useState('All Campaigns');

  const campaigns = [
    {
      id: 1,
      name: 'Help enter guided convers...',
      type: 'SMS | Broadcast | Edited Jul 11, 2023',
      message: 'Hey there, This is Soham from ...',
      source: 'SaaS',
      recipients: 2,
      status: 'Approval pending',
      statusColor: 'bg-orange-100 text-orange-600',
      createdOn: '02 Jan 2024',
      icon: Megaphone
    },
    {
      id: 2,
      name: 'Help enter guided convers...',
      type: 'SMS | Broadcast | Edited Jul 11, 2023',
      message: 'Hello {csv.FIRSTNAME}, Thank...',
      source: 'SaaS',
      recipients: 4,
      status: 'Draft',
      statusColor: 'bg-gray-100 text-gray-600',
      createdOn: '02 Jan 2024',
      icon: History
    },
    {
      id: 3,
      name: 'Help enter guided convers...',
      type: 'SMS | Broadcast | Edited Jul 11, 2023',
      message: 'Hey there, This is Soham from ...',
      source: 'SaaS',
      recipients: 2,
      status: 'Scheduled',
      statusColor: 'bg-blue-100 text-blue-600',
      createdOn: '02 Jan 2024',
      icon: Timer
    },
    {
      id: 4,
      name: 'Help enter guided convers...',
      type: 'SMS | Broadcast | Edited Jul 11, 2023',
      message: 'Hello {csv.FIRSTNAME}, Thank...',
      source: 'SaaS',
      recipients: 2,
      status: 'Aborted',
      statusColor: 'bg-red-100 text-red-600',
      createdOn: '02 Jan 2024',
      icon: Timer
    },
    {
      id: 5,
      name: 'Help enter guided convers...',
      type: 'SMS | Broadcast | Edited Jul 11, 2023',
      message: 'Conversation flows',
      source: 'SaaS',
      recipients: 2,
      status: 'Ongoing',
      statusColor: 'bg-orange-100 text-orange-600',
      createdOn: '02 Jan 2024',
      icon: Timer
    },
    {
      id: 6,
      name: 'Help enter guided convers...',
      type: 'SMS | Broadcast | Edited Jul 11, 2023',
      message: 'Hello {csv.FIRSTNAME}, Thank...',
      source: 'SaaS',
      recipients: 2,
      status: 'Aborted',
      statusColor: 'bg-red-100 text-red-600',
      createdOn: '02 Jan 2024',
      icon: Timer
    }
  ];


  return (
    <div className="bg-gray-50 h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16 overflow-y-auto">
        {/* Top Header */}

        <Header />
        {/* Campaign Header */}
        <div className="bg-white  px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Campaign</h1>
            <p className="text-gray-500 mt-1">Automate your customer journey with pre build recepies</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              {/* Toggle Group: List & Calendar */}
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center justify-center px-3 py-2 text-sm border-r border-gray-300 ${viewMode === 'list' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-gray-100'
                    }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`flex items-center justify-center px-3 py-2 text-sm ${viewMode === 'calendar' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-gray-100'
                    }`}
                >
                  <Calendar size={16} />
                </button>
              </div>

              {/* Help Icon */}
              <button className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300  text-gray-500 bg-gray-100">
                <HelpCircle size={16} />
              </button>

              {/* Create Campaign */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Create Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="flex-1 mb-6 bg-white pb-3 px-6 py-6 mb-7">
          {/* Tabs and Controls */}
          <div className="border-b border-gray-200 mb-6 flex items-center justify-between px-1">
            {/* Tabs */}
            <div className="flex space-x-6">
              {['All Campaigns', 'Activity log'].map((tab) => (
                <button
                  key={tab}
                  className={`relative pb-3 text-2xl font-medium transition-colors ${selectedTab === tab
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                  {selectedTab === tab && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex items-center mb-2 space-x-3">
              {/* Search Input */}
              <div className="relative" style={{ width: '9cm', height: '1.1cm' }}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-9 pr-4 text-sm w-full h-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Filter Button */}
              <button
                className="flex items-center justify-center space-x-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                style={{ width: '3.5cm', height: '1.1cm' }}
              >
                <Filter size={20} />
                <span className="text-sm text-gray-400">Filter</span>
              </button>
            </div>
          </div>

          {/* Table */}
          {viewMode === 'list' ? (<Tablecontent  campaigns={campaigns}/>) : (
            <CampaignCalendar />
          )}

          {/* Footer Pagination */}
          {viewMode === 'list' ? (<Pagination/>) : ("")}


        </div>
      </div>
    </div>
  );
}
