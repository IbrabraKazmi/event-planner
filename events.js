const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events - Get all events with optional filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      priority, 
      completed, 
      search, 
      sortBy = 'datetime',
      limit = 100,
      page = 1
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sort = {};
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        sort = { priority: -1, datetime: 1 };
        break;
      case 'title':
        sort = { title: 1 };
        break;
      case 'category':
        sort = { category: 1, datetime: 1 };
        break;
      default:
        sort = { datetime: 1 };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const events = await Event.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      data: events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events',
      message: error.message
    });
  }
});

// GET /api/events/:id - Get a specific event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });

  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event',
      message: error.message
    });
  }
});

// POST /api/events - Create a new event
router.post('/', async (req, res) => {
  try {
    const { title, description, datetime, location, category, priority } = req.body;

    // Validate required fields
    if (!title || !datetime) {
      return res.status(400).json({
        success: false,
        error: 'Title and datetime are required'
      });
    }

    // Create new event
    const event = new Event({
      title,
      description,
      datetime: new Date(datetime),
      location,
      category: category || 'personal',
      priority: priority || 'medium'
    });

    const savedEvent = await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: savedEvent
    });

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create event',
      message: error.message
    });
  }
});

// PUT /api/events/:id - Update an existing event
router.put('/:id', async (req, res) => {
  try {
    const { title, description, datetime, location, category, priority, completed } = req.body;

    // Find and update event
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        datetime: datetime ? new Date(datetime) : undefined,
        location,
        category,
        priority,
        completed
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });

  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update event',
      message: error.message
    });
  }
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully',
      data: deletedEvent
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete event',
      message: error.message
    });
  }
});

// PATCH /api/events/:id/toggle - Toggle event completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    // Toggle completion status
    event.completed = !event.completed;
    const updatedEvent = await event.save();

    res.json({
      success: true,
      message: `Event marked as ${updatedEvent.completed ? 'complete' : 'incomplete'}`,
      data: updatedEvent
    });

  } catch (error) {
    console.error('Error toggling event status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle event status',
      message: error.message
    });
  }
});

// GET /api/events/upcoming - Get upcoming events
router.get('/upcoming/events', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const upcomingEvents = await Event.findUpcoming(parseInt(limit));

    res.json({
      success: true,
      data: upcomingEvents
    });

  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming events',
      message: error.message
    });
  }
});

module.exports = router; 