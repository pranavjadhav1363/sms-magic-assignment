'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

const Tablecontent = ({ campaigns }) =>
{
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() =>
  {
    const handleClickOutside = (event) =>
    {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      )
      {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRowClick = () =>
  {
    router.push('/page3');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Campaign Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Message</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Recipient's Source</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">No. of Recipients</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Created On</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={handleRowClick}
            >
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="text-blue w-8 h-8 bg-blue-50 flex items-center justify-center text-lg">
                    <campaign.icon className="text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{campaign.name}</div>
                    <div className="text-xs text-gray-500">{campaign.type}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">
                {campaign.message.length > 40
                  ? `${campaign.message.slice(0, 40)}...`
                  : campaign.message}
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">{campaign.source}</td>
              <td className="py-4 px-4 text-sm text-gray-500">{campaign.recipients}</td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.statusColor}`}>
                  {campaign.status}
                  {campaign.status === 'Approval pending' && (
                    <div className="ml-1 w-4 h-4 bg-orange-200 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-xs">!</span>
                    </div>
                  )}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">{campaign.createdOn}</td>
              <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setOpenDropdown(openDropdown === campaign.id ? null : campaign.id)}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {openDropdown === campaign.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-40">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => alert('Rerun')}>Rerun campaign</button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={(e) =>
                        {
                          e.stopPropagation();
                          router.push('/page3');
                        }}
                      >
                        View details
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Delete</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tablecontent;
