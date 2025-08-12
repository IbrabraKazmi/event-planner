// Import React hooks for state management
import React, { useState, useEffect } from 'react';

// Import custom components
import Header from './components/Header';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventCalendar from './components/EventCalendar';

// Import CSS for styling
import './App.css';

// Main App component that manages the entire application
function App() {
  // State for managing events - stored in localStorage for persistence
  const [events, setEvents] = useState([]);
  
  // State for managing the current view (list or calendar)
  const [view, setView] = useState('list');
  
  // State for managing the form visibility and editing mode
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Load events from localStorage when component mounts
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Function to add a new event
  const addEvent = (newEvent) => {
    // Create a unique ID for the event
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    // Add the new event to the events array
    setEvents(prevEvents => [...prevEvents, eventWithId]);
    
    // Hide the form and reset editing state
    setShowForm(false);
    setEditingEvent(null);
  };

  // Function to handle form submission (both add and edit)
  const handleFormSubmit = (eventData) => {
    console.log('Form submission received:', eventData);
    console.log('Currently editing:', editingEvent);
    
    if (editingEvent) {
      console.log('Updating event:', editingEvent.id);
      // Update existing event
      updateEvent(editingEvent.id, eventData);
    } else {
      console.log('Adding new event');
      // Add new event
      addEvent(eventData);
    }
  };

  // Function to start editing an event
  const startEditEvent = (event) => {
    try {
      // Extract date and time from datetime for the form
      const eventDate = new Date(event.datetime);
      
      // Check if the date is valid
      if (isNaN(eventDate.getTime())) {
        console.error('Invalid datetime:', event.datetime);
        return;
      }
      
      const formattedEvent = {
        ...event,
        date: eventDate.toISOString().split('T')[0],
        time: eventDate.toTimeString().slice(0, 5)
      };
      
      console.log('Editing event:', formattedEvent);
      setEditingEvent(formattedEvent);
      setShowForm(true);
    } catch (error) {
      console.error('Error starting edit:', error);
      console.log('Event data:', event);
    }
  };

  // Function to delete an event
  const deleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  // Function to update an existing event
  const updateEvent = (eventId, updatedEvent) => {
    console.log('Updating event with ID:', eventId);
    console.log('Updated event data:', updatedEvent);
    
    setEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event => 
        event.id === eventId ? { ...event, ...updatedEvent } : event
      );
      console.log('Events after update:', updatedEvents);
      return updatedEvents;
    });
    
    // Hide the form and reset editing state
    setShowForm(false);
    setEditingEvent(null);
  };

  // Function to toggle event completion status
  const toggleEventStatus = (eventId) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, completed: !event.completed }
          : event
      )
    );
  };

  return (
    <div className="App">
      {/* Header component with navigation and title */}
      <Header 
        onAddEvent={() => {
          setEditingEvent(null);
          setShowForm(true);
        }}
        currentView={view}
        onViewChange={setView}
        isEditing={!!editingEvent}
      />
      
      {/* Main content area */}
      <main className="container mt-4">
        {/* Event form - shown when adding/editing events */}
        {showForm && (
          <EventForm
            event={editingEvent}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
          />
        )}
        
        {/* Event list view */}
        {view === 'list' && (
          <EventList
            events={events}
            onDelete={deleteEvent}
            onUpdate={startEditEvent}
            onToggleStatus={toggleEventStatus}
          />
        )}
        
        {/* Calendar view */}
        {view === 'calendar' && (
          <EventCalendar
            events={events}
            onEventClick={(event) => {
              // Handle event click in calendar view
              console.log('Event clicked:', event);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App; 