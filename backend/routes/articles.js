const express = require("express");
const router = express.Router();
const articles = require("../data/articles");

// GET all articles
router.get("/", (req, res) => {
	res.json({ success: true, data: articles });
});

// GET single article by id
router.get("/:id", (req, res) => {
	const article = articles.find((a) => a.id === parseInt(req.params.id));
	if (!article) return res.status(404).json({ success: false, message: "Article not found" });
	res.json({ success: true, data: article });
});

module.exports = router;
