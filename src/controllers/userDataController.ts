import { UserslotData, NewUserslotData } from "../models/userData";
import { Request, Response } from 'express';

export const getuserDataHome = async (req: Request, res: Response) => {
    try {
        const allUserData = await UserslotData.find();
        if (allUserData.length === 0) {
            res.status(404).json({ message: 'No data found in the database' });
        }
        const { weekday, slotTime,userId } = req.query;
        if (!weekday && !slotTime && !userId) {
            res.status(200).json({
                data: allUserData,
                message: 'All user data retrieved successfully'
            });
        }
        // Filtered response based on query parameters
        const matchedUser = await UserslotData.find({
            ...(weekday && { weekday }),
            ...(slotTime && { slotTime }),
            ...(userId &&{userId})
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
    const { weekday, slotTime, userId } = req.body;
    if (!weekday || !slotTime || !userId) {
        res.status(400).json({ message: 'Please provide all fields ' });
    }
    try {
        const existingSlot = await NewUserslotData.findOne({ weekday });
        const existingUserTime = await NewUserslotData.findOne({ slotTime });
        const matchedUser = await NewUserslotData.findOne({userId});
        console.log("========================", matchedUser);
        if (existingSlot === weekday) {
            res.status(400).json({ message: 'User with this weekday already exists' });
        }
        if (existingUserTime === slotTime) {
            res.status(400).json({ message: "slot already exists" })
        }
        if (matchedUser === userId) {
           res.status(400).json({ message: "user id already exists" })
        }
        // Create a new slot
        const newUser = new NewUserslotData({
            weekday,
            slotTime,
            userId,
        });
        // Save the new slot to the database
        await newUser.save();
        res.status(200).json({ newUser, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};