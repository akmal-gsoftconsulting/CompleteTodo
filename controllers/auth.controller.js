import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).send("User already exists");
		}
		await User.create({ name, email, password });
		res.status(201).send("User created successfully");
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			// console.log(user);
			// const token = jwt.sign(user , process.env.JWT_SECRET);
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "strict"
			});
			res.status(200).json({ token, "message": "Login successful" });

		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		res.status(500).send("Error in login controller", error.message);
	}
};

export const logout = async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1]; // Get token from "Bearer <token>"

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		// Decode the token to see its contents
		// const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log('Decoded Token:', decoded);

		// Clear the token cookie (if needed)
		res.clearCookie('token');
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error decoding token:', error);
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};



export const forgotpassword = async (req, res) => {

	try {
		var email = req.body.email;
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'akmal246afzal@gmail.com',
				pass: '--- --- ---'
			}
		});

		var mailOptions = {
			from: 'akmal246afzal@gmail.com',
			to: email,
			subject: 'Sending Email for reset password',
			text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRmZmM4MWY0YTQ2ZDE3NzUwZDUwNDIiLCJpYXQiOjE3MzMzMTA3NDJ9.U1G1vmHIza7l7Hf3-fzkWOyqNJJMormXCNy6_jRVOlY'
		};

		// transporter.sendMail(mailOptions, function (error, info) {
		// 	if (error) {
		// 		console.log(error);
		// 	} else {
		// 		console.log('Email sent: ' + info.response);
		// 	}
		// });

		try {
			const info = await transporter.sendMail(mailOptions);
			console.log('Email sent: ' + info.response);
		} catch (error) {
			console.log(error);
		}
		res.send("email send");
	} catch (error) {
		res.send("email not send", error.message);
	}


}



export const resetPassword = async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: "No token, authentication failed" });
	}
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	
	try {
		const { newPassword } = req.body;
		const userId = decoded.userId;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		user.password = newPassword;
		await user.save();
		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error resetting password", error: error.message });
	}
	
}








