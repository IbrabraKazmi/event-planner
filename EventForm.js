// Import React hooks for form state management
import React, { useState, useEffect } from 'react';

// EventForm component for creating and editing events
function EventForm({ onSubmit, onCancel, event = null }) {
  // Form state - initialize with event data if editing, or empty values if creating
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    priority: event?.priority || 'medium',
    category: event?.category || 'personal'
  });

  // Update form data when event prop changes (for editing mode)
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        priority: event.priority || 'medium',
        category: event.category || 'personal'
      });
    }
  }, [event]);

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes and update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Combine date and time into a single datetime string
      const eventData = {
        ...formData,
        datetime: `${formData.date}T${formData.time}`,
        completed: event?.completed || false,
        id: event?.id, // Preserve ID if editing
        createdAt: event?.createdAt // Preserve creation date if editing
      };
      
      console.log('Form submitted:', eventData);
      console.log('Is editing:', !!event);
      onSubmit(eventData);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3 className="mb-0">
          <i className="fas fa-plus-circle me-2"></i>
          {event ? 'Edit Event' : 'Add New Event'}
        </h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Event Title */}
            <div className="col-md-6 mb-3">
              <label htmlFor="title" className="form-label">
                Event Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Event Category */}
            <div className="col-md-6 mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="family">Family</option>
                <option value="social">Social</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
            />
          </div>

          <div className="row">
            {/* Event Date */}
            <div className="col-md-6 mb-3">
              <label htmlFor="date" className="form-label">
                Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>

            {/* Event Time */}
            <div className="col-md-6 mb-3">
              <label htmlFor="time" className="form-label">
                Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <div className="invalid-feedback">{errors.time}</div>}
            </div>
          </div>

          <div className="row">
            {/* Event Location */}
            <div className="col-md-6 mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
              />
            </div>

            {/* Event Priority */}
            <div className="col-md-6 mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Form action buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              <i className="fas fa-times me-1"></i>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <i className="fas fa-save me-1"></i>
              {event ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm; 