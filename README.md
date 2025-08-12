# Event Planner - React Application

A comprehensive event planning application built with React that helps you organize and manage your events efficiently.

## Features

### 🎯 **Core Functionality**
- **Add Events**: Create new events with title, description, date, time, location, priority, and category
- **Edit Events**: Modify existing events with an intuitive form interface
- **Delete Events**: Remove events you no longer need
- **Mark Complete**: Track event completion status

### 📱 **Dual View Modes**
- **List View**: See all events in a organized list with filtering and sorting options
- **Calendar View**: Visual calendar interface showing events by date

### 🔍 **Advanced Filtering & Search**
- **Search**: Find events by title or description
- **Category Filter**: Filter by event category (Personal, Work, Family, Social, Health, Other)
- **Priority Filter**: Filter by priority level (Low, Medium, High, Urgent)
- **Sorting**: Sort events by date, priority, title, or category

### 💾 **Data Persistence**
- **Local Storage**: Events are automatically saved to your browser's local storage
- **No Data Loss**: Your events persist between browser sessions

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Bootstrap Styling**: Clean, professional appearance with Bootstrap 5
- **Font Awesome Icons**: Intuitive iconography throughout the interface
- **Smooth Animations**: Pleasant visual feedback and transitions

## Technology Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Bootstrap 5.1.3 + Custom CSS
- **Icons**: Font Awesome 6.0.0
- **Date Handling**: Native JavaScript Date API
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App

## Project Structure

```
event-planner/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header.js      # Application header with navigation
│   │   ├── EventForm.js   # Form for adding/editing events
│   │   ├── EventList.js   # List view of events
│   │   └── EventCalendar.js # Calendar view of events
│   ├── App.js             # Main application component
│   ├── index.js           # React entry point
│   ├── App.css            # Main application styles
│   └── index.css          # Global styles and CSS reset
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd event-planner
   
   # Or simply extract the downloaded files
   cd event-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## How to Use

### Adding Events
1. Click the **"Add Event"** button in the header
2. Fill out the event form with required information:
   - **Title** (required): Name of your event
   - **Description**: Additional details about the event
   - **Date** (required): When the event occurs
   - **Time** (required): What time the event starts
   - **Location**: Where the event takes place
   - **Category**: Type of event (Personal, Work, Family, etc.)
   - **Priority**: Importance level (Low, Medium, High, Urgent)
3. Click **"Add Event"** to save

### Managing Events
- **View Events**: Switch between List and Calendar views using the toggle buttons
- **Edit Events**: Click the edit (pencil) icon on any event
- **Delete Events**: Click the delete (trash) icon on any event
- **Mark Complete**: Click the circle/check button to toggle completion status

### Filtering and Searching
- **Search**: Use the search bar to find events by title or description
- **Category Filter**: Select a specific category to narrow down events
- **Priority Filter**: Choose a priority level to focus on important events
- **Sorting**: Change the order of events using the "Sort By" dropdown

### Calendar View
- **Navigate Months**: Use the arrow buttons to move between months
- **Go to Today**: Click "Today" to return to the current month
- **View Events**: Click on any date to see events for that day
- **Event Indicators**: Colored dots show events on the calendar (color indicates priority)

## Features in Detail

### Event Categories
- **Personal**: Individual activities and appointments
- **Work**: Professional meetings and tasks
- **Family**: Family-related events and activities
- **Social**: Social gatherings and entertainment
- **Health**: Medical appointments and wellness activities
- **Other**: Miscellaneous events

### Priority Levels
- **Low**: Not urgent, can be postponed if needed
- **Medium**: Standard importance, should be completed on time
- **High**: Important, requires attention and timely completion
- **Urgent**: Critical, must be completed immediately

### Data Storage
- Events are stored in your browser's local storage
- No data is sent to external servers
- Your events remain private and local to your device
- Data persists between browser sessions and restarts

## Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured interface with all controls visible
- **Tablet**: Optimized layout for medium-sized screens
- **Mobile**: Touch-friendly interface with stacked controls

## Customization

### Styling
- Modify `src/App.css` for component-specific styles
- Edit `src/index.css` for global styles and CSS reset
- Bootstrap classes can be customized by overriding CSS variables

### Adding Features
- New components can be added to the `src/components/` directory
- Import and use new components in `App.js`
- Follow the existing component structure and naming conventions

## Troubleshooting

### Common Issues

1. **Events not saving**
   - Check if your browser supports local storage
   - Try refreshing the page
   - Clear browser cache and try again

2. **Calendar not displaying correctly**
   - Ensure you're using a modern browser
   - Check if JavaScript is enabled
   - Try switching between List and Calendar views

3. **Form not working**
   - Verify all required fields are filled
   - Check browser console for error messages
   - Ensure date and time formats are correct

### Performance Tips

- **Large Event Lists**: Use filters to narrow down events for better performance
- **Calendar View**: Switch to List view when working with many events
- **Browser**: Use modern browsers for optimal performance

## Future Enhancements

Potential features for future versions:
- **Cloud Sync**: Save events to cloud storage
- **Recurring Events**: Set up repeating events
- **Event Reminders**: Get notifications before events
- **Event Sharing**: Share events with others
- **Calendar Export**: Export to popular calendar formats
- **Dark Mode**: Toggle between light and dark themes
- **Multi-language Support**: Interface in different languages

## Contributing

This is a demonstration project, but if you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Try clearing browser cache and cookies

---

**Enjoy organizing your events with the Event Planner! 🎉** 