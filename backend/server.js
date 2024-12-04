const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cloudusers', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  address1: String,
  address2: String,
  city: String,
  postalCode: String,
  country: String,
  phoneNumber: String,
  email: String,
  notes: String,
});

const User = mongoose.model('User', userSchema);

// Routes
// GET all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET single user by ID
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST a new user
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

// PUT to update a user
app.put('/api/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

// DELETE a user
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
