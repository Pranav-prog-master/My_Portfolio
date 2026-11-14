const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { sendContactMail } = require('../mailer');

// POST contact message
router.post('/', async (req, res) => {
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ success: false, message: 'Invalid email address.' });
	}

	try {
		// Save to MongoDB
		await Message.create({ name, email, message });

		// Send both emails
		await sendContactMail({ name, email, message });

		console.log(`[Contact] New message from ${name} <${email}>`);
		res.status(201).json({ success: true, message: "Message received! I'll get back to you soon." });
	} catch (err) {
		console.error('[Contact Error]', err.message);
		res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
	}
});

// GET all messages
router.get('/', async (req, res) => {
	try {
		const messages = await Message.find().sort({ receivedAt: -1 });
		res.json({ success: true, data: messages });
	} catch (err) {
		res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
	}
});

module.exports = router;
