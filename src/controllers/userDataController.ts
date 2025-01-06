import { generateTokens } from "../utils/auth";
import {UserslotData,  NewUserslotData } from "../models/userData";
import { Request, Response } from 'express';

export const getuserDataHome = async (req: Request, res: Response) => {
    try {
        const allUserData = await UserslotData.find();
        if (allUserData.length === 0) {
            res.status(404).json({ message: 'No data found in the database' });
        }
        const { weekday, slotTime } = req.query;
        if (!weekday && !slotTime) {
            res.status(200).json({
                data: allUserData,
                message: 'All user data retrieved successfully'
            });
        }
        // Filtered response based on query parameters
        const matchedUser = await UserslotData.find({
            ...(weekday && { weekday }),
            ...(slotTime && { slotTime })
        });
        res.status(200).json({
            data: matchedUser,
            message: 'Filtered user data retrieved successfully'
        });
    } catch (error: any) {
        console.error(error);
    }
};


export const newUserslots = async (req: Request, res: Response) => {
    const { weekday, slotTime } = req.body;
    // Basic validation to check if fields are provided
    if (!weekday || !slotTime) {
        res.status(400).json({ message: 'Please provide all fields ' });
    }
    try {
        const existingSlot = await NewUserslotData.findOne({ weekday });
        const existingUserTime = await NewUserslotData.findOne({ slotTime });
        if (existingSlot) {
            res.status(400).json({ message: 'User with this weekday already exists' });
        }
        if (existingUserTime) {
            res.status(400).json({ message: "slot already exists" })
        }
        // Create a new slot
        const newUser = new NewUserslotData({
            weekday,
            slotTime

        });
        // Save the new slot to the database
        await newUser.save();
        var { accessToken } = await generateTokens(newUser?.id);
        res.status(200).json({ newUser, accessToken, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};