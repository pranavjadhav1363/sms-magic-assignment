'use client';
import React from 'react';
import
{
    Home,
    Users,
    MessageSquare,
    BarChart3,
    Zap,
    Database,
    Phone,
    Heart,
    Lightbulb,
    HelpCircle,
    FileText,
    User,
    ArrowLeft,
    Smartphone,
    MessageCircle,
    Menu,
    CreditCard,
    List,
    Calendar,
    Timer,
    CornerUpLeft
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';

const data = [
    { name: 'Sent', value: 14017 },
    { name: 'Delivered', value: 14016 },
    { name: 'Response', value: 2158 },
    { name: 'Conversation', value: 1590 },
];

const segmentedData = data.map((d, i) =>
    i < data.length - 1 ? [d, data[i + 1]] : []
).filter(Boolean);
export default function CampaignDetailsPage()
{
    return (
        <div className="bg-white min-h-screen flex">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            <div className="flex-1 ml-16">
                {/* Header */}
               <Header/>
                <div className="flex items-center space-x-2 px-4 py-3 border-b">
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">Upcoming sale</h2>
                    <span className="ml-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Completed
                    </span>
                </div>
                <div className="flex px-6 gap-6 ">
                    <div className="flex-1">
                        <div className="bg-white pl-12 pt-6 pb-2">
                            <div className="text-gray-700 ">
                                <div className="bg-blue-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 inline-flex items-center w-full">

                                    {/* <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    </div> */}
                                    Out of &nbsp;<strong>15,017 </strong>&nbsp;we have found&nbsp; <strong>14,017 </strong>&nbsp; valid numbers!
                                </div>
                            </div>
                        </div>

                        {/* Content */}

                        {/* Left Section */}
                        <div className="flex-1 p-6">
                            <div className="bg-white rounded-lg  p-6 mb-6">
                                <div className="flex gap-8 mb-6 border p-2 rounded-lg border-gray-200">
                                    {/* Chart and Metrics */}
                                    <div className="flex-1">
                                        <div className="grid grid-cols-4 px-4 pt-4 pb-2 text-center text-sm bg-white rounded-t-lg">
                                            {data.map((item) => (
                                                <div key={item.name} className="px-2">
                                                    <div className="text-gray-500">{item.name}</div>
                                                    <div className="text-lg font-semibold text-gray-900">{item.value.toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>


                                        {/* Chart */}
                                        <div className="h-24 w-full px-4 relative">
                                            {/* Vertical Grid Background for Segments */}
                                            <div className="absolute inset-0 flex">
                                                {[...Array(4)].map((_, i) => (
                                                    <div key={i} className="flex-1 border-r border-gray-350 last:border-none" />
                                                ))}
                                            </div>

                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart
                                                    data={data}
                                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                                >
                                                    <defs>
                                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
                                                            <stop offset="100%" stopColor="#BFDBFE" stopOpacity={0.2} />
                                                        </linearGradient>
                                                    </defs>

                                                    <XAxis dataKey="name" hide />
                                                    <Tooltip />
                                                    <Area
                                                        type="linear"
                                                        dataKey="value"
                                                        stroke="#3B82F6"
                                                        fill="url(#blueGradient)"  // Reference the gradient
                                                        strokeWidth={2}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Right side - Additional Metrics */}
                                    <div className="w-60 grid grid-cols-2 gap-2 text-xs whitespace-nowrap">

                                        <div className="border-l border-gray-200 p-3 rounded">
                                            <div className="text-gray-400 text-xs ">Valid Number</div>
                                            <div className="font-bold text-lg text-gray-900">67%</div>
                                        </div>
                                        <div className="border-l border-gray-200 p-3 rounded">
                                            <div className="text-gray-400 text-sm mb-1">Invalid Number</div>
                                            <div className="font-bold text-lg text-gray-900">500</div>
                                        </div>
                                        <div className="border-l border-gray-200 p-3 rounded">
                                            <div className="text-gray-400 text-sm mb-1">Opt - out</div>
                                            <div className="font-bold text-lg text-gray-900">13%</div>
                                        </div>
                                        <div className="border-l border-gray-200 p-3 rounded">
                                            <div className="text-gray-400 text-sm mb-1">Response rate</div>
                                            <div className="font-bold text-lg text-gray-900">11.35%</div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-200 my-6" />

                                <div className="text-gray-700 mb-6">
                                    <span className="font-medium">Campaign description : </span>
                                    <span className="text-gray-600">End of the season sale of 2024</span>
                                </div>

                                {/* Campaign Details */}
                                <div className="grid grid-cols-5 bg-[#F3F4F6] rounded-lg p-6 gap-6 text-sm mb-6">
                                    <div className="border-r border-[#DDE0E1] ">
                                        <div className="text-gray-400 mb-2">Total recipients</div>
                                        <div className=" text-gray-900 text-base">15,017</div>
                                    </div>
                                    <div className="border-r border-[#DDE0E1] ">
                                        <div className="text-gray-400 mb-2">Campaign Type</div>
                                        <div className=" text-gray-900 text-base">Broadcast</div>
                                    </div>
                                    <div className="border-r border-[#DDE0E1] ">
                                        <div className="text-gray-400 mb-2">Channel</div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <MessageCircle />
                                            </div>
                                            <span className=" text-gray-900 text-base">WhatsApp</span>
                                        </div>
                                    </div >
                                    <div className="border-r border-[#DDE0E1] ">
                                        <div className="text-gray-400 mb-2">Sender ID</div>
                                        <div className="text-gray-900 text-base">98181928198</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 mb-2 whitespace-nowrap">Total credits consumed</div>
                                        <div className="text-gray-900 text-base">20,000</div>
                                    </div>
                                </div>

                                <hr className="border-gray-200 my-6" />

                                {/* To Section */}
                                <div className="mb-6">
                                    <div className="font-bold text-gray-900 mb-2">To</div>
                                    <div className="text-sm flex space-x-4">
                                        <div className="space-y-0.5">
                                            <div className="text-gray-400 text-base">Leads</div>
                                            <div className=" text-gray-900 text-base">Contacts</div>
                                        </div>
                                        <div className="space-y-0.5">
                                            <div className="text-gray-400 text-base">List</div>
                                            <div className=" text-gray-900 text-base">Phone field</div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-200 my-6" />

                                {/* Compliance Setting */}
                                <div className="mb-6">
                                    <div className="font-bold text-gray-900 mb-3">Compliance Setting</div>
                                    <div className="text-gray-700 text-base">Send only to Opted-in numbers</div>
                                </div>

                                <hr className="border-gray-200 my-6" />

                                {/* When */}
                                <div>
                                    <div className="font-bold text-gray-900 mb-3">When</div>
                                    <div className="bg-blue-50 border border-gray-200 rounded-lg px-4 py-3 p-1 text-xm text-gray-700 inline-flex items-center">
                                        <div className="w-4 h-4 flex items-center justify-center mr-3">
                                            <Timer />

                                        </div>
                                        The messages sent on&nbsp;<strong>&nbsp;Jan 23, 2024 at 12:00 pm, Pacific Standard Time&nbsp;</strong>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="m-4 overflow-hidden w-[400px]">
                        {/* Outer frame */}
                        <div className="bg-white border border-gray-300 border-b-0 rounded-t-2xl p-3">
                            {/* WhatsApp Header */}
                            <div className="bg-teal-600 text-white p-4 flex items-center space-x-3 rounded-t-4xl">
                                <ArrowLeft size={20} />
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-teal-600 font-bold text-sm">C</span>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">Company name</div>
                                </div>
                                <div className="flex space-x-1">
                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                </div>
                            </div>

                            {/* Inner Chat Area with full border */}
                            <div className="border border-gray-300 rounded-b-4xl overflow-hidden">
                                <div className="bg-[#F2E4D7] p-4 h-[500px]">
                                    <div className="flex justify-center">
                                        <div className="text-center text-xs text-gray-500 mb-4 bg-white px-2 py-1 rounded-full inline-block">
                                            Today
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-xs">
                                            <div className="mb-4">
                                                <img src="/80612796.jpg" alt="Offer" className="rounded-lg w-full" />
                                            </div>
                                            <div className="text-sm text-gray-800 mb-4 leading-relaxed">
                                                Recharge with 349 Rs. and get best value for 28 days, 2GB/day + Unlimited 5G
                                            </div>
                                            <div className="space-y-2">
                                                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-100 text-gray-800 py-2 text-sm font-medium hover:bg-gray-200 transition">
                                                    <CornerUpLeft size={16} className="rotate-180" />
                                                    Recharge with 349 Rs.
                                                </button>
                                                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-100 text-gray-800 py-2 text-sm font-medium hover:bg-gray-200 transition">
                                                    <CornerUpLeft size={16} className="rotate-180" />
                                                    More Plans
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
