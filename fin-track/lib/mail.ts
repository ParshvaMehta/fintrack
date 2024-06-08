import * as nodemailer from "nodemailer";
import { env } from "process";

const transporter = nodemailer.createTransport({
	host: env.EMAIL_HOST,
	port: env.EMAIL_PORT,
	auth: {
		user: env.EMAIL_HOST_USER,
		pass: env.EMAIL_HOST_PASSWORD,
	},
});

export async function sendMail(to: string, subject: string, html: string) {
	try {
		const mailOptions = {
			from: env.DEFAULT_FROM_EMAIL,
			to,
			subject,
			html,
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(error);
			} else {
				console.log("Email sent: %s", info.response);
			}
		});
	} catch (e) {
		console.error(e);
	}
}
