// Import React hooks for state management
import React, { useState } from 'react';

// EventList component for displaying events in a list format
function EventList({ events, onDelete, onUpdate, onToggleStatus }) {
  // State for filtering and sorting
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(events.map(event => event.category))];
  
  // Get unique priorities for filter dropdown
  const priorities = ['all', 'low', 'medium', 'high', 'urgent'];

  // Filter and sort events based on current filters and sort criteria
  const filteredAndSortedEvents = events
    .filter(event => {
      // Filter by category
      if (filterCategory !== 'all' && event.category !== filterCategory) {
        return false;
      }
      
      // Filter by priority
      if (filterPriority !== 'all' && event.priority !== filterPriority) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.datetime) - new Date(b.datetime);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      low: 'bg-success',
      medium: 'bg-warning',
      high: 'bg-danger',
      urgent: 'bg-dark'
    };
    return `badge ${priorityStyles[priority] || 'bg-secondary'}`;
  };

  // Get category badge styling
  const getCategoryBadge = (category) => {
    const categoryStyles = {
      personal: 'bg-info',
      work: 'bg-primary',
      family: 'bg-success',
      social: 'bg-warning',
      health: 'bg-danger',
      other: 'bg-secondary'
    };
    return `badge ${categoryStyles[category] || 'bg-secondary'}`;
  };

  // Format date for display
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Filters and search section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Search input */}
            <div className="col-md-4">
              <label htmlFor="search" className="form-label">Search Events</label>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <div className="col-md-2">
              <label htmlFor="categoryFilter" className="form-label">Category</label>
              <select
                className="form-select"
                id="categoryFilter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority filter */}
            <div className="col-md-2">
              <label htmlFor="priorityFilter" className="form-label">Priority</label>
              <select
                className="form-select"
                id="priorityFilter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div className="col-md-2">
              <label htmlFor="sortBy" className="form-label">Sort By</label>
              <select
                className="form-select"
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Results count */}
            <div className="col-md-2 d-flex align-items-end">
              <span className="text-muted">
                {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Events list */}
      {filteredAndSortedEvents.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No events found</h4>
          <p className="text-muted">Try adjusting your filters or add a new event.</p>
        </div>
      ) : (
        <div className="row">
          {filteredAndSortedEvents.map(event => (
            <div key={event.id} className="col-12 mb-3">
              <div className={`card ${event.completed ? 'border-success bg-light' : ''}`}>
                <div className="card-body">
                  <div className="row align-items-center">
                    {/* Event status and title */}
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <button
                          className={`btn btn-sm me-2 ${event.completed ? 'btn-success' : 'btn-outline-secondary'}`}
                          onClick={() => onToggleStatus(event.id)}
                          title={event.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          <i className={`fas ${event.completed ? 'fa-check' : 'fa-circle'}`}></i>
                        </button>
                        <div>
                          <h5 className={`card-title mb-1 ${event.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                            {event.title}
                          </h5>
                          <p className="card-text text-muted mb-0">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="col-md-3">
                      <div className="d-flex flex-column">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          {formatDate(event.datetime)}
                        </small>
                        <small className="text-muted">
                          <i className="fas fa-clock me-1"></i>
                          {formatTime(event.datetime)}
                        </small>
                        {event.location && (
                          <small className="text-muted">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {event.location}
                          </small>
                        )}
                      </div>
                    </div>

                    {/* Event badges */}
                    <div className="col-md-2">
                      <div className="d-flex flex-column gap-1">
                        <span className={getPriorityBadge(event.priority)}>
                          {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                        </span>
                        <span className={getCategoryBadge(event.category)}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="col-md-3 text-end">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            console.log('Edit button clicked for event:', event);
                            onUpdate(event);
                          }}
                          title="Edit event"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(event.id)}
                          title="Delete event"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList; 