# 🗄️ Database Setup Guide for Event Planner

This guide will help you connect your Event Planner application to a MongoDB database.

## 🚀 **Quick Start (3 Options)**

### **Option 1: MongoDB Local Installation (Recommended for Development)**

#### **Step 1: Install MongoDB Community Edition**
1. **Download MongoDB Community Server** from [mongodb.com](https://www.mongodb.com/try/download/community)
2. **Install MongoDB** following the installation wizard
3. **Start MongoDB service**:
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### **Step 2: Install Backend Dependencies**
```bash
cd backend
npm install
```

#### **Step 3: Create Environment File**
```bash
# Copy the example file
cp env.example .env

# Edit .env file with your settings
MONGODB_URI=mongodb://localhost:27017/event-planner
PORT=5000
NODE_ENV=development
```

#### **Step 4: Start Backend Server**
```bash
cd backend
npm run dev
```

### **Option 2: MongoDB Atlas (Cloud Database - Free Tier)**

#### **Step 1: Create MongoDB Atlas Account**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Create a new cluster (choose "Free" tier)

#### **Step 2: Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

#### **Step 3: Update Environment File**
```bash
# Edit .env file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-planner?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

#### **Step 4: Start Backend Server**
```bash
cd backend
npm run dev
```

### **Option 3: Docker (Advanced Users)**

#### **Step 1: Install Docker**
Download and install Docker from [docker.com](https://www.docker.com/)

#### **Step 2: Run MongoDB Container**
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

#### **Step 3: Start Backend**
```bash
cd backend
npm run dev
```

## 🔧 **Backend Configuration**

### **File Structure**
```
backend/
├── models/
│   └── Event.js          # MongoDB schema
├── routes/
│   └── events.js         # API endpoints
├── server.js             # Main server file
├── package.json          # Dependencies
└── .env                  # Environment variables
```

### **Environment Variables**
```bash
# Required
MONGODB_URI=mongodb://localhost:27017/event-planner

# Optional
PORT=5000
NODE_ENV=development
```

## 📱 **Frontend Integration**

### **Update App.js to Use API**
The frontend now includes an API service layer that automatically communicates with the backend.

### **API Endpoints Available**
- `GET /api/events` - Get all events (with filtering)
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/:id/toggle` - Toggle completion
- `GET /api/events/upcoming/events` - Get upcoming events

## 🧪 **Testing the Setup**

### **1. Start Backend Server**
```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
✅ Connected to MongoDB successfully!
📱 Frontend should connect to: http://localhost:5000
🔗 Health check: http://localhost:5000/health
```

### **2. Test API Endpoints**
```bash
# Health check
curl http://localhost:5000/health

# Get all events
curl http://localhost:5000/api/events

# Create test event
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Event","datetime":"2024-01-15T10:00:00Z"}'
```

### **3. Frontend Integration**
1. **Keep frontend running** on port 3000
2. **Backend runs** on port 5000
3. **Frontend automatically** connects to backend API
4. **Events are stored** in MongoDB database

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. MongoDB Connection Failed**
```bash
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB service is running
- Check if MongoDB is installed correctly
- Verify port 27017 is not blocked

#### **2. Port Already in Use**
```bash
❌ Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in .env file
- Kill process using port 5000
- Use different port

#### **3. CORS Errors in Frontend**
```bash
❌ Access to fetch at 'http://localhost:5000/api/events' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution:**
- Backend includes CORS middleware
- Ensure backend is running on port 5000
- Check .env configuration

### **Debug Commands**
```bash
# Check MongoDB status
mongo --eval "db.serverStatus()"

# Check backend logs
cd backend && npm run dev

# Test database connection
mongo event-planner --eval "db.events.find()"
```

## 🔒 **Security Considerations**

### **Production Deployment**
1. **Use environment variables** for sensitive data
2. **Enable authentication** for MongoDB
3. **Use HTTPS** in production
4. **Implement rate limiting**
5. **Add input validation**

### **MongoDB Security**
```bash
# Enable authentication
use admin
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["userAdminAnyDatabase"]
})

# Update connection string
MONGODB_URI=mongodb://admin:secure-password@localhost:27017/event-planner?authSource=admin
```

## 📊 **Database Schema**

### **Event Collection Structure**
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  datetime: Date (required),
  location: String,
  category: String (enum: personal, work, family, social, health, other),
  priority: String (enum: low, medium, high, urgent),
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Indexes for Performance**
- `datetime: 1` - Date-based queries
- `category: 1` - Category filtering
- `priority: 1` - Priority filtering
- `completed: 1` - Completion status
- `createdAt: -1` - Recent events

## 🎯 **Next Steps**

### **Immediate Actions**
1. ✅ **Choose database option** (Local/Atlas/Docker)
2. ✅ **Install dependencies** and start backend
3. ✅ **Test API endpoints** with curl or Postman
4. ✅ **Verify frontend integration**

### **Future Enhancements**
- 🔐 **User authentication** and authorization
- 📧 **Email notifications** for upcoming events
- 🔄 **Real-time updates** with WebSockets
- 📱 **Mobile app** development
- 🔍 **Advanced search** and analytics

## 📞 **Support**

If you encounter issues:
1. **Check console logs** for error messages
2. **Verify MongoDB connection** and status
3. **Test API endpoints** independently
4. **Review environment variables**
5. **Check port conflicts**

---

**🎉 Congratulations! Your Event Planner now has a real database backend!** 