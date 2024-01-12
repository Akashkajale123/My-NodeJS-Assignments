const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Blog', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Blog Schema
const blogSchema = new mongoose.Schema({
  topic: String,
  description: String,
  posted_at: String,
  posted_by: String,
});

const Blog = mongoose.model('Blog', blogSchema);

// API Endpoints

// 1. Fetch Blogs
app.get('/blog', async (req, res) => {
  try {
    const { page = 1, search = '' } = req.query;
    const perPage = 5;
    const skip = (page - 1) * perPage;

    const query = {
      topic: { $regex: new RegExp(search, 'i') }, // Case-insensitive search
    };

    const blogs = await Blog.find(query).skip(skip).limit(perPage);
    res.status(200).json({ status: 'success', result: blogs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// 2. Create Blog
app.post('/blog', async (req, res) => {
  try {
    const { topic, description, posted_at, posted_by } = req.body;
    const newBlog = new Blog({ topic, description, posted_at, posted_by });
    const savedBlog = await newBlog.save();
    res.status(201).json({ status: 'success', result: savedBlog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// 3. Update Blog
app.put('/blog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, description, posted_at, posted_by } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { topic, description, posted_at, posted_by },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found' });
    }

    res.status(200).json({ status: 'success', result: updatedBlog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// 4. Delete Blog
app.delete('/blog/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found' });
    }

    res.status(200).json({ status: 'success', result: deletedBlog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
