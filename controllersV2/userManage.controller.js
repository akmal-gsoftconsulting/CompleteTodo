import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const getUser = async (req, res) => {
    

	const token = req.headers.authorization?.split(' ')[1]; 

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.userId;
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

	} catch (error) {
		console.error('Error decoding token:', error);
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(name) user.name = name;
        if(email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
}