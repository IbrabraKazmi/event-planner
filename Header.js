// Import React for component creation
import React from 'react';

// Header component that displays the app title, navigation, and add event button
function Header({ onAddEvent, currentView, onViewChange, isEditing = false }) {
  return (
    <header className="bg-primary text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          {/* App title and logo */}
          <div className="col-md-6">
            <h1 className="mb-0">
              <i className="fas fa-calendar-alt me-2"></i>
              Event Planner
            </h1>
            <p className="mb-0 text-light">Organize your events efficiently</p>
          </div>
          
          {/* Navigation and controls */}
          <div className="col-md-6 text-md-end">
            {/* View toggle buttons */}
            <div className="btn-group me-3" role="group">
              <button
                type="button"
                className={`btn ${currentView === 'list' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => onViewChange('list')}
              >
                <i className="fas fa-list me-1"></i>
                List View
              </button>
              <button
                type="button"
                className={`btn ${currentView === 'calendar' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => onViewChange('calendar')}
              >
                <i className="fas fa-calendar me-1"></i>
                Calendar View
              </button>
            </div>
            
            {/* Add Event button */}
            <button
              className="btn btn-success"
              onClick={onAddEvent}
            >
              <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus'} me-1`}></i>
              {isEditing ? 'Edit Event' : 'Add Event'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 