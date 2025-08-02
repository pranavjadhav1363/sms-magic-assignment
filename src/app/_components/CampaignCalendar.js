import React, { useState, useEffect, useRef } from 'react';
import { useRouter  } from 'next/navigation';
import { ChevronLeft, ChevronRight, X, MessageSquare, Mail, Phone, Calendar } from 'lucide-react';

const CampaignCalendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date()); // July 2025
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [view, setView] = useState('Month'); // 'Month', 'Week', 'Day'
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Sample events data (API format)
  const eventsData = [
    {
      id: 1,
      date: '2025-08-01',
      name: 'Exclusive Offers and News',
      desc: 'Welcome campaign for new subscribers',
      status: 'ongoing',
      type: 'SMS',
      subtype: 'Broadcast',
      time: null,
      icon: 'MessageSquare',
      message: 'Hey {{Lead.FirstName}}!\nThank you for signing in with SMS-Magic. You have been added to our subscription list and now be among the first new arrivals, big events and special offers. 🎉',
      image: '/80612796.jpg',
      backgroundColor: '#FEF3C7', // yellow-100
      textColor: '#D97706', // yellow-600
      editedDate: 'Jul 11, 2023'
    },
    {
      id: 2,
      date: '2025-08-03',
      name: 'Special Offers',
      desc: 'Limited time promotional campaign',
      status: 'completed',
      type: 'Email',
      subtype: 'Promotional',
      time: null,
      icon: 'Mail',
      message: 'Don\'t miss out on our special summer offers! Get up to 50% off on selected items.',
      image: '/80612796.jpg',
      backgroundColor: '#FCE7F3', // pink-100
      textColor: '#DB2777', // pink-600
      editedDate: 'Jul 07, 2025'
    },
    {
      id: 3,
      date: '2025-08-15',
      name: 'Lead generation campaign',
      desc: 'Evening lead generation push',
      status: 'ongoing',
      type: 'SMS',
      subtype: 'Lead Gen',
      time: '21:30',
      icon: 'MessageSquare',
      message: 'Interested in our premium services? Reply YES to learn more about exclusive deals!',
      image: '/80612796.jpg',
      backgroundColor: '#DBEAFE', // blue-100
      textColor: '#2563EB', // blue-600
      editedDate: 'Jul 15, 2025'
    },
    {
      id: 4,
      date: '2025-07-17',
      name: 'Black friday sales campaign',
      desc: 'Pre-black friday sales push',
      status: 'completed',
      type: 'SMS',
      subtype: 'Sales',
      time: '16:00',
      icon: 'MessageSquare',
      message: 'Get ready for Black Friday! Early bird discounts available now.',
      image: '/80612796.jpg',
      backgroundColor: '#DBEAFE', // blue-100
      textColor: '#2563EB', // blue-600
      editedDate: 'Jul 17, 2025'
    },
    {
      id: 5,
      date: '2025-08-17',
      name: 'Sales Surge',
      desc: 'High-impact sales campaign',
      status: 'ongoing',
      type: 'SMS',
      subtype: 'Sales',
      time: '18:00',
      icon: 'MessageSquare',
      message: 'Final hours! Don\'t miss our biggest sale of the year.',
      image: '/80612796.jpg',
      backgroundColor: '#DBEAFE', // blue-100
      textColor: '#2563EB', // blue-600
      editedDate: 'Jul 18, 2025'
    },
    {
      id: 6,
      date: '2025-08-18',
      name: 'Lead connection follow-up',
      desc: 'Follow-up campaign for new leads',
      status: 'ongoing',
      type: 'SMS',
      subtype: 'Follow-up',
      time: '23:00',
      icon: 'MessageSquare',
      message: 'Thanks for your interest! Our team will contact you within 24 hours.',
      image: '/80612796.jpg',
      backgroundColor: '#DBEAFE', // blue-100
      textColor: '#2563EB', // blue-600
      editedDate: 'Jul 18, 2025'
    },
    {
      id: 7,
      date: '2025-08-19',
      name: 'Exclusive VIP Offers',
      desc: 'VIP customer exclusive campaign',
      status: 'completed',
      type: 'Email',
      subtype: 'VIP',
      time: '01:30',
      icon: 'Mail',
      message: 'As a VIP member, enjoy exclusive access to our premium collection.',
      image: '/80612796.jpg',
      backgroundColor: '#D1FAE5', // green-100
      textColor: '#059669', // green-600
      editedDate: 'Jul 19, 2025'
    },
    {
      id: 8,
      date: '2025-08-19',
      name: 'Birthday Party Invitation',
      desc: 'Company anniversary celebration',
      status: 'ongoing',
      type: 'SMS',
      subtype: 'Event',
      time: '12:30',
      icon: 'Calendar',
      message: 'Join us for our 5th anniversary celebration! Special prizes and surprises await.',
      image: '/80612796.jpg',
      backgroundColor: '#FEF3C7', // yellow-100
      textColor: '#D97706', // yellow-600
      editedDate: 'Jul 19, 2025'
    },
    {
      id: 9,
      date: '2025-09-19',
      name: 'New drive for membership',
      desc: 'Membership acquisition campaign',
      status: 'ongoing',
      type: 'Phone',
      subtype: 'Membership',
      time: '17:30',
      icon: 'Phone',
      message: 'Become a premium member today and unlock exclusive benefits!',
      image: '/80612796.jpg',
      backgroundColor: '#D1FAE5', // green-100
      textColor: '#059669', // green-600
      editedDate: 'Jul 19, 2025'
    }
  ];

  // Group events by date
  const getEventsByDate = (dateString) => {
    return eventsData.filter(event => event.date === dateString);
  };

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      weekDays.push({
        day: dayDate.getDate(),
        date: dayDate,
        dateString: formatDateToString(dayDate),
        isCurrentMonth: dayDate.getMonth() === currentDate.getMonth()
      });
    }
    return weekDays;
  };

  const getCurrentDay = (date) => {
    return {
      day: date.getDate(),
      date: date,
      dateString: formatDateToString(date),
      isCurrentMonth: true
    };
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        day: prevDate.getDate(),
        isCurrentMonth: false,
        date: prevDate,
        dateString: formatDateToString(prevDate)
      });
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      days.push({
        day,
        isCurrentMonth: true,
        date: currentDay,
        dateString: formatDateToString(currentDay)
      });
    }
    
    // Add days from next month
    const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        day: nextDate.getDate(),
        isCurrentMonth: false,
        date: nextDate,
        dateString: formatDateToString(nextDate)
      });
    }
    
    return days;
  };

  const navigateDate = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'Month') {
        newDate.setMonth(prev.getMonth() + direction);
      } else if (view === 'Week') {
        newDate.setDate(prev.getDate() + (direction * 7));
      } else if (view === 'Day') {
        newDate.setDate(prev.getDate() + direction);
      }
      return newDate;
    });
  };

  // Enhanced event click handler with better positioning
  const handleEventClick = (event, mouseEvent) => {
    mouseEvent.stopPropagation();
    mouseEvent.preventDefault();
    
    // Get the clicked element and its bounding box
    const targetElement = mouseEvent.currentTarget;
    const rect = targetElement.getBoundingClientRect();
    
    // Popup dimensions
    const POPUP_WIDTH = 320;
    const POPUP_HEIGHT = 400;
    const BUFFER = 12;
    
    // Calculate initial position (to the right of the event)
    let x = rect.right + BUFFER;
    let y = rect.top;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position if popup goes off-screen
    if (x + POPUP_WIDTH > viewportWidth) {
      // Position to the left of the event
      x = rect.left - POPUP_WIDTH - BUFFER;
      
      // If still off-screen, center it horizontally
      if (x < 0) {
        x = Math.max(BUFFER, (viewportWidth - POPUP_WIDTH) / 2);
      }
    }
    
    // Adjust vertical position if popup goes off-screen
    if (y + POPUP_HEIGHT > viewportHeight) {
      // Position above the event
      y = rect.top - POPUP_HEIGHT - BUFFER;
      
      // If still off-screen, position at bottom with buffer
      if (y < 0) {
        y = Math.max(BUFFER, viewportHeight - POPUP_HEIGHT - BUFFER);
      }
    }
    
    // Ensure minimum distance from viewport edges
    x = Math.max(BUFFER, Math.min(x, viewportWidth - POPUP_WIDTH - BUFFER));
    y = Math.max(BUFFER, Math.min(y, viewportHeight - POPUP_HEIGHT - BUFFER));
    
    // Set state to show popup
    setPopupPosition({ x, y });
    setSelectedEvent(event);
    setShowPopup(true);
  };

  // Handle popup card click to redirect to page3
  const handlePopupCardClick = () => {
    if (selectedEvent) {
     router.push('/page3',)
    }
  };

  // Close popup when clicking outside
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target) && !e.target.closest('.event-item')) {
      setShowPopup(false);
      setSelectedEvent(null);
    }
  };

  // Close popup on escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowPopup(false);
      setSelectedEvent(null);
    }
  };

  // Add event listeners
  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPopup]);

  const getIcon = (iconName) => {
    const icons = {
      MessageSquare: MessageSquare,
      Mail: Mail,
      Phone: Phone,
      Calendar: Calendar
    };
    const IconComponent = icons[iconName] || MessageSquare;
    return <IconComponent size={16} />;
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'p' : 'a';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}${minutes !== '00' ? ':' + minutes : ''}${ampm}`;
  };

  const getDisplayTitle = () => {
    if (view === 'Month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (view === 'Week') {
      const weekDays = getWeekDays(currentDate);
      const startDate = weekDays[0].date;
      const endDate = weekDays[6].date;
      
      if (startDate.getMonth() === endDate.getMonth()) {
        return `${monthNames[startDate.getMonth()]} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`;
      } else {
        return `${monthNames[startDate.getMonth()]} ${startDate.getDate()} - ${monthNames[endDate.getMonth()]} ${endDate.getDate()}, ${startDate.getFullYear()}`;
      }
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  const days = view === 'Month' ? getDaysInMonth(currentDate) : 
               view === 'Week' ? getWeekDays(currentDate) : 
               [getCurrentDay(currentDate)];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-normal text-gray-900">
          {getDisplayTitle()}
        </h1>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg">
            <button 
              onClick={() => setView('Month')}
              className={`px-4 py-2 text-sm rounded-lg ${
                view === 'Month' 
                  ? 'bg-white text-gray-900 shadow-sm border' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Month
            </button>
            <button 
              onClick={() => setView('Week')}
              className={`px-4 py-2 text-sm rounded-lg ${
                view === 'Week' 
                  ? 'bg-white text-gray-900 shadow-sm border' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setView('Day')}
              className={`px-4 py-2 text-sm rounded-lg ${
                view === 'Day' 
                  ? 'bg-white text-gray-900 shadow-sm border' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
          </div>
          
          <div className="flex items-center space-x-1 ml-4">
            <button
              onClick={() => navigateDate(-1)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => navigateDate(1)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="relative">
        {/* Day Headers */}
        {view !== 'Day' && (
          <div className="grid grid-cols-7 border-b border-gray-200">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0">
                {day}
              </div>
            ))}
          </div>
        )}

        {/* Month View */}
        {view === 'Month' && (
          <div className="grid grid-cols-7">
            {days.map((dayInfo, index) => {
              const dayEvents = dayInfo.isCurrentMonth ? getEventsByDate(dayInfo.dateString) : [];
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                    !dayInfo.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className={`text-sm mb-2 ${
                    !dayInfo.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {dayInfo.day}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity event-item"
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <div 
                          className="text-xs px-2 py-1 rounded truncate"
                          style={{ 
                            backgroundColor: event.backgroundColor,
                            color: event.textColor 
                          }}
                        >
                          {event.time && (
                            <span className="font-medium">
                              {formatTime(event.time)} 
                            </span>
                          )}
                          {event.time && ' '}
                          <span>{event.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Week View */}
        {view === 'Week' && (
          <div className="grid grid-cols-7">
            {days.map((dayInfo, index) => {
              const dayEvents = getEventsByDate(dayInfo.dateString);
              
              return (
                <div
                  key={index}
                  className={`min-h-[200px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                    !dayInfo.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className={`text-sm mb-2 font-medium ${
                    !dayInfo.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {dayInfo.day}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity event-item"
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <div 
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: event.backgroundColor,
                            color: event.textColor 
                          }}
                        >
                          {event.time && (
                            <div className="font-medium mb-1">
                              {formatTime(event.time)}
                            </div>
                          )}
                          <div className="truncate">{event.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Day View */}
        {view === 'Day' && (
          <div className="p-4">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {dayNames[currentDate.getDay()]}, {monthNames[currentDate.getMonth()]} {currentDate.getDate()}
                </h3>
              </div>
              
              <div className="p-4">
                {getEventsByDate(formatDateToString(currentDate)).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No events scheduled for this day</p>
                ) : (
                  <div className="space-y-3">
                    {getEventsByDate(formatDateToString(currentDate))
                      .sort((a, b) => {
                        if (!a.time && !b.time) return 0;
                        if (!a.time) return 1;
                        if (!b.time) return -1;
                        return a.time.localeCompare(b.time);
                      })
                      .map((event) => (
                        <div 
                          key={event.id}
                          className="cursor-pointer hover:opacity-80 transition-opacity event-item"
                          onClick={(e) => handleEventClick(event, e)}
                        >
                          <div 
                            className="p-3 rounded-lg border-l-4"
                            style={{ 
                              backgroundColor: event.backgroundColor,
                              borderLeftColor: event.textColor
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="text-blue-600">
                                  {getIcon(event.icon)}
                                </div>
                                <div>
                                  <h4 className="font-medium" style={{ color: event.textColor }}>
                                    {event.name}
                                  </h4>
                                  <p className="text-xs text-gray-600 mt-1">{event.desc}</p>
                                </div>
                              </div>
                              {event.time && (
                                <div className="text-sm font-medium" style={{ color: event.textColor }}>
                                  {formatTime(event.time)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Event Popup */}
        {showPopup && selectedEvent && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/10 z-40" />
            
            {/* Popup */}
            <div 
              ref={popupRef}
              className="fixed bg-white rounded-lg shadow-xl border border-gray-200 w-80 z-50 max-h-[400px] overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
              style={{
                left: `${popupPosition.x}px`,
                top: `${popupPosition.y}px`
              }}
              onClick={handlePopupCardClick}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      selectedEvent.status === 'ongoing' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent popup card click
                      setShowPopup(false);
                      setSelectedEvent(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-blue-600">
                      {getIcon(selectedEvent.icon)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {selectedEvent.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      {selectedEvent.type} | {selectedEvent.subtype} | Edited {selectedEvent.editedDate}
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <img 
                        src={selectedEvent.image} 
                        alt="Campaign preview" 
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                    </div>
                    
                    <div className="max-h-32 overflow-y-auto">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedEvent.message}
                      </p>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignCalendar;