import { Request, Response } from 'express';
import Slot from "../models/slotBooking"

export const slotBook = async (req: Request, res: Response) => {
    const { weekday, slotTime } = req.body;
    if (!weekday || !slotTime) {
        res.status(400).json({ message: 'Please provide all fields (weekday, slotTime )' });
    }
    try {
        const existingWeek = await Slot.findOne({ weekday });
        const existingSlot = await Slot.findOne({ slotTime });
        if (existingWeek) {     
            res.status(400).json({ message: 'weekname already exists' });
        } 
        if (existingSlot) {
            res.status(400).json({ message: "slot already exists" })
        }
        // Create a new slot
        const newSlot = new Slot({
            weekday,
            slotTime,
        });
        await newSlot.save();
        res.status(200).json({ newSlot, message: 'slot updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};