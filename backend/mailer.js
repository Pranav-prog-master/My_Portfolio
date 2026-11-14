const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

// ─── Mail 1: Notification to Pranav ───────────────────────────────────────────
async function sendReceivedMail({ name, email, message }) {
	await transporter.sendMail({
		from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
		to: process.env.MAIL_TO,
		replyTo: email,
		subject: `📬 New Message from ${name} — Portfolio`,
		html: `
      <div style="font-family:'Courier New',monospace;background:#1e1e1e;color:#cccccc;padding:32px;border-radius:8px;max-width:600px;margin:0 auto;">

        <!-- Header -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #30363d;">
          <div style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block;margin-right:4px;"></div>
          <div style="width:12px;height:12px;border-radius:50%;background:#febc2e;display:inline-block;margin-right:4px;"></div>
          <div style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block;margin-right:16px;"></div>
          <span style="color:#858585;font-size:11px;">contact.css — Pranav's Portfolio</span>
        </div>

        <h2 style="color:#4ec9b0;font-size:16px;margin:0 0 4px;">// new_message_received</h2>
        <p style="color:#858585;font-size:11px;margin:0 0 24px;">pranav-badgujar &gt; contact.css &gt; <span style="color:#cccccc;">inbox</span></p>

        <!-- Sender Info -->
        <div style="background:#252526;border:1px solid #30363d;border-radius:6px;padding:16px;margin-bottom:16px;">
          <p style="color:#6a9955;font-size:11px;margin:0 0 12px;letter-spacing:0.08em;">// SENDER_INFO</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:6px 0;color:#858585;font-size:12px;width:90px;">name</td>
              <td style="padding:6px 0;color:#ce9178;font-size:13px;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#858585;font-size:12px;">email</td>
              <td style="padding:6px 0;font-size:13px;"><a href="mailto:${email}" style="color:#3794ff;text-decoration:none;">${email}</a></td>
            </tr>
          </table>
        </div>

        <!-- Message -->
        <div style="background:#252526;border:1px solid #30363d;border-left:3px solid #007acc;border-radius:6px;padding:16px;margin-bottom:24px;">
          <p style="color:#6a9955;font-size:11px;margin:0 0 10px;letter-spacing:0.08em;">// MESSAGE</p>
          <p style="color:#cccccc;font-size:13px;line-height:1.8;white-space:pre-wrap;margin:0;">${message}</p>
        </div>

        <!-- Reply Button -->
        <a href="mailto:${email}?subject=Re: Your message on Pranav's Portfolio" style="display:inline-block;background:#007acc;color:#ffffff;padding:10px 20px;border-radius:4px;font-size:13px;text-decoration:none;font-family:'Courier New',monospace;">↩ Reply to ${name}</a>

        <!-- Footer -->
        <p style="margin-top:28px;padding-top:16px;border-top:1px solid #30363d;color:#858585;font-size:11px;margin-bottom:0;">
          ⎇ main &nbsp;·&nbsp; Pranav's Portfolio &nbsp;·&nbsp; UTF-8
        </p>
      </div>
    `,
	});
}

// ─── Mail 2: Auto-reply confirmation to Sender ────────────────────────────────
async function sendAutoReplyMail({ name, email, message }) {
	await transporter.sendMail({
		from: `"Pranav Badgujar" <${process.env.MAIL_USER}>`,
		to: email,
		subject: `✅ Got your message, ${name}! — Pranav Badgujar`,
		html: `
      <div style="font-family:'Courier New',monospace;background:#1e1e1e;color:#cccccc;padding:32px;border-radius:8px;max-width:600px;margin:0 auto;">

        <!-- Header -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #30363d;">
          <div style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block;margin-right:4px;"></div>
          <div style="width:12px;height:12px;border-radius:50%;background:#febc2e;display:inline-block;margin-right:4px;"></div>
          <div style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block;margin-right:16px;"></div>
          <span style="color:#858585;font-size:11px;">auto-reply.ts — Pranav's Portfolio</span>
        </div>

        <h2 style="color:#73c991;font-size:16px;margin:0 0 4px;">// message_received ✓</h2>
        <p style="color:#858585;font-size:11px;margin:0 0 24px;">pranav-badgujar &gt; contact.css &gt; <span style="color:#cccccc;">auto-reply</span></p>

        <!-- Greeting -->
        <div style="background:#252526;border:1px solid #30363d;border-left:3px solid #73c991;border-radius:6px;padding:16px;margin-bottom:16px;">
          <p style="color:#cccccc;font-size:13px;line-height:1.8;margin:0;">
            Hey <span style="color:#ce9178;font-weight:600;">${name}</span>,<br/><br/>
            Thanks for reaching out! I've received your message and will get back to you as soon as possible — usually within <span style="color:#4fc1ff;">24–48 hours</span>.<br/><br/>
            <span style="color:#858585;">— Pranav Badgujar</span>
          </p>
        </div>

        <!-- Their message echo -->
        <div style="background:#252526;border:1px solid #30363d;border-radius:6px;padding:16px;margin-bottom:24px;">
          <p style="color:#6a9955;font-size:11px;margin:0 0 10px;letter-spacing:0.08em;">// YOUR_MESSAGE</p>
          <p style="color:#858585;font-size:12px;line-height:1.7;white-space:pre-wrap;margin:0;font-style:italic;">${message}</p>
        </div>

        <!-- Social Links -->
        <div style="margin-bottom:24px;">
          <p style="color:#6a9955;font-size:11px;margin:0 0 10px;letter-spacing:0.08em;">// CONNECT</p>
          <a href="https://github.com/Pranav-prog-master" style="color:#3794ff;font-size:12px;text-decoration:none;margin-right:16px;">⬡ GitHub</a>
          <a href="https://www.linkedin.com/in/pranav-badgujar-821224319/" style="color:#3794ff;font-size:12px;text-decoration:none;margin-right:16px;">in LinkedIn</a>
          <a href="mailto:pranavbadgujar843@gmail.com" style="color:#3794ff;font-size:12px;text-decoration:none;">✉ Email</a>
        </div>

        <!-- Footer -->
        <p style="margin-top:28px;padding-top:16px;border-top:1px solid #30363d;color:#858585;font-size:11px;margin-bottom:0;">
          ⎇ main &nbsp;·&nbsp; Pranav's Portfolio &nbsp;·&nbsp; Surat, Gujarat, India
        </p>
      </div>
    `,
	});
}

// ─── Export both ──────────────────────────────────────────────────────────────
async function sendContactMail(data) {
	await Promise.all([
		sendReceivedMail(data),
		sendAutoReplyMail(data),
	]);
}

module.exports = { sendContactMail };
