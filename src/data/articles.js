import React from "react";

function article_1() {
	return {
		date: "15 April 2023",
		title: "Backend Development with AI",
		description:
			"Backend development drives performance, flexibility, and security. Future collaboration with intelligent systems promises seamless integration, enhanced automation, and optimized workflows across diverse digital ecosystems worldwide.",
		keywords: [
			"Backend Development with AI",
			"Pranav", 
			"Pranav B", 
			"Pranav Badgujar"
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">Content of article 1</div>
					<img
						src="https://picsum.photos/200/300"
						alt="random"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "7 June 2025",
		title: "Artificial Intelligence in Data Science",
		description:
			"AI is transforming the revolutionizes data science by automating analysis and building predictive models. AI uncovers deep insights from vast datasets, enabling smarter, data-driven decision-making for businesses.",
		style: ``,
		keywords: [
			"Artificial Intelligence in Data Science",
			"Pranav",
			"Pranav B",
			"Pranav Badgujar"
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">Content of article 1</div>
					<img
						src="https://picsum.photos/200/300"
						alt="random"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
