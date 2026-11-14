require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const projectsRouter = require('./routes/projects');
const articlesRouter = require('./routes/articles');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
	res.json({ success: true, message: "Pranav's portfolio backend is running." });
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({ success: false, message: 'Route not found.' });
});

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB connected');
		const server = app.listen(PORT, () => {
			console.log(`Backend running at http://localhost:${PORT}`);
		});
		server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.error(`Port ${PORT} is already in use. Change PORT in .env`);
				process.exit(1);
			}
		});
	})
	.catch((err) => {
		console.error('MongoDB connection failed:', err.message);
		process.exit(1);
	});
