// Import React hooks for state management
import React, { useState, useEffect } from 'react';

// EventCalendar component for displaying events in a calendar format
function EventCalendar({ events, onEventClick }) {
  // State for current month and year
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getMonth();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.datetime);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const grid = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push(null);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      
      grid.push({
        date,
        day,
        events: dayEvents
      });
    }

    return grid;
  };

  // Get priority color for event dots
  const getPriorityColor = (priority) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#dc3545',
      urgent: '#343a40'
    };
    return colors[priority] || '#6c757d';
  };

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Handle event click
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    onEventClick(event);
  };

  const calendarGrid = generateCalendarGrid();

  return (
    <div className="calendar-container">
      {/* Calendar header with navigation */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">
              <i className="fas fa-calendar-alt me-2"></i>
              {getMonthName(currentDate)}
            </h3>
            <div className="btn-group" role="group">
              <button
                className="btn btn-outline-primary"
                onClick={goToPreviousMonth}
                title="Previous month"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={goToToday}
                title="Go to today"
              >
                Today
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={goToNextMonth}
                title="Next month"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="card">
        <div className="card-body p-0">
          {/* Day headers */}
          <div className="calendar-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="calendar-grid">
            {calendarGrid.map((dayData, index) => (
              <div
                key={index}
                className={`calendar-day ${!dayData ? 'empty' : ''} ${
                  dayData && isToday(dayData.date) ? 'today' : ''
                } ${dayData && isSelected(dayData.date) ? 'selected' : ''}`}
                onClick={() => dayData && handleDateClick(dayData.date)}
              >
                {dayData && (
                  <>
                    <div className="calendar-day-number">{dayData.day}</div>
                    <div className="calendar-day-events">
                      {dayData.events.slice(0, 3).map((event, eventIndex) => (
                        <div
                          key={event.id}
                          className="calendar-event-dot"
                          style={{ backgroundColor: getPriorityColor(event.priority) }}
                          onClick={(e) => handleEventClick(event, e)}
                          title={`${event.title} - ${event.priority} priority`}
                        />
                      ))}
                      {dayData.events.length > 3 && (
                        <div className="calendar-event-more">
                          +{dayData.events.length - 3}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected date events */}
      {selectedDate && (
        <div className="card mt-4">
          <div className="card-header">
            <h5 className="mb-0">
              Events for {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h5>
          </div>
          <div className="card-body">
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className="text-muted">No events scheduled for this date.</p>
            ) : (
              <div className="list-group">
                {getEventsForDate(selectedDate)
                  .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
                  .map(event => (
                    <div
                      key={event.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{event.title}</h6>
                          <p className="mb-1 text-muted">{event.description}</p>
                          <small className="text-muted">
                            <i className="fas fa-clock me-1"></i>
                            {new Date(event.datetime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {event.location && (
                              <>
                                <i className="fas fa-map-marker-alt ms-2 me-1"></i>
                                {event.location}
                              </>
                            )}
                          </small>
                        </div>
                        <div>
                          <span className={`badge ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCalendar; 