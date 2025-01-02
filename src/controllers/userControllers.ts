import { Request, Response } from 'express';
import User from '../models/userModels';
import { checkAccessToken, generateTokens } from '../utils/auth';

// Controller function to handle user signup
export const signupUser = async (req: Request, res: Response) => {
    const { username, email, password, mobileNumber } = req.body;
    // Basic validation to check if fields are provided
    if (!username || !email || !password || !mobileNumber) {
        res.status(400).json({ message: 'Please provide all fields (username, email, password , mobileNumber)' });
    }
    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        const existingUserMobile = await User.findOne({ mobileNumber });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
        }
        if (existingUserMobile) {
            res.status(400).json({ message: "Mobile number already exists" })
        }
        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password,
            mobileNumber,
            role: "user"
        });
        // Save the new user to the database
        await newUser.save();
        var { accessToken } = await generateTokens(newUser?.id);
        res.status(200).json({ newUser, accessToken, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Please provide all fields (email, password)' });
    }
    try {
        // Check if a user with the same email already exists
        const existingUser: any = await User.findOne({ email });
        const matchPassword = await User.findOne({ password });
        if (!existingUser) {
            res.status(400).json({ message: 'Email not found' });
        }
        if (!matchPassword) {
            res.status(400).json({ message: 'Password not matched' });
        }
        var { accessToken } = await generateTokens(existingUser?.id);
        // Return success response
        res.status(200).json({ existingUser, accessToken, message: 'User successfully login' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getuserData = async (req: Request, res: Response) => {
    const token: any = req.headers.authorization?.split("Bearer ")[1];
    // Validate if the token exists in the request body
    if (!token) {
        res.status(400).json({ message: 'Please provide a token' });
    }
    try {
        var { data } = await checkAccessToken(token);
        console.log(data);
        let userId = data.user?._id

        if (!userId) {
            res.status(400).json({ message: 'Invalid token, no user data found' });
        }

        const matchedUser = await User.findById(userId);
        if (!matchedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            data: matchedUser,
            message: 'Token verified and user data retrieved successfully'
        });

    } catch (error: any) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            res.status(400).json({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            res.status(400).json({ message: 'Token has expired' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

