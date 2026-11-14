import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus(null);
		try {
			const res = await fetch("http://localhost:4000/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (data.success) {
				setStatus({ type: "success", message: data.message });
				setForm({ name: "", email: "", message: "" });
			} else {
				setStatus({ type: "error", message: data.message });
			}
		} catch {
			setStatus({ type: "error", message: "Could not reach the server. Please try again later." });
		}
		setLoading(false);
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					{/* Line 1: Title */}
					<div className="title contact-title">
						Let's Get in Touch: Ways to Connect with Me
					</div>

					{/* Line 2: Paragraph */}
					<div className="subtitle contact-subtitle">
						Thank you for your interest in getting in touch with me. I welcome your feedback, questions, and suggestions. If you have a specific question or comment, please feel free to email me directly at{" "}
						<a href={`mailto:${INFO.main.email}`}>G-Mail</a>
						. I make an effort to respond to all messages within 24 hours, although it may take me longer during busy periods. Alternatively, you can use the contact form on my website to get in touch. Simply fill out the required fields and I'll get back to you as soon as possible. Finally, if you prefer to connect on social media, you can find me on{" "}
						<a href={INFO.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
						. I post regular updates and engage with my followers there, so don't hesitate to reach out. Thanks again for your interest, and I look forward to hearing from you!
					</div>

					{/* Line 3: Form (left) + Socials (right) */}
					<div className="contact-bottom">
						<div className="contact-form-wrapper">
							<form className="contact-form" onSubmit={handleSubmit}>
								<input
									type="text"
									name="name"
									placeholder="Your Name"
									value={form.name}
									onChange={handleChange}
									required
								/>
								<input
									type="email"
									name="email"
									placeholder="Your Email"
									value={form.email}
									onChange={handleChange}
									required
								/>
								<textarea
									name="message"
									placeholder="Your Message"
									rows={5}
									value={form.message}
									onChange={handleChange}
									required
								/>
								<button type="submit" disabled={loading}>
									{loading ? "Sending..." : "Send Message"}
								</button>
								{status && (
									<p className={`contact-status ${status.type}`}>
										{status.message}
									</p>
								)}
							</form>
						</div>

						<div className="contact-socials-wrapper">
							<Socials />
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
