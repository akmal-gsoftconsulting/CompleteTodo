import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";

export const signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
        const userExists = await User.aggregate([
            { $match: { email: email } }
        ]);
         
		if (userExists) {
			return res.status(400).json({
                message: "User already exists",
                success: false,
                errorCode: "USER_ALREADY_EXISTS"
             });
             
		}
		const createdUser= await User.create({ name, email, password });
		res.status(201).json({
            message: "User created successfully",
            success: true,
            userId: createdUser._id 
         });
         
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
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
			
			res.status(200).json({ token, "message": "Login successful" });

		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		res.status(500).send("Error in login controller", error.message);
	}
};

export const logout = async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1]; 

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		res.status(200).json({ message: 'Logged out successfully' 
            , success : "true"
        });
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
				user: process.env.GLOBAL_EMAIL ,
				pass: process.env.GLOBAL_PASSWORD
			}
		});			

		var mailOptions = {
			from: process.env.GLOBAL_EMAIL,
			to: email,
			subject: 'Sending Email for reset password',
			text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzRmZmM4MWY0YTQ2ZDE3NzUwZDUwNDIiLCJpYXQiOjE3MzMzMTA3NDJ9.U1G1vmHIza7l7Hf3-fzkWOyqNJJMormXCNy6_jRVOlY'
		};

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
        await User.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: newPassword } }
        );
		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error resetting password", error: error.message });
	}
	
}








