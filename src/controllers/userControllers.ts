import { Request, Response } from 'express';
import { getDb } from '../db/mydb';
import { User } from '../models/userModels';

// Get all users from the database
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const db = getDb();
        const collection = db.collection('users');
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users from database');
    }
};

// Add a new user to the database
export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser: User = req.body;
        const db = getDb();
        const collection = db.collection('users');
        await collection.insertOne(newUser);
        res.status(201).send('User added successfully');
    } catch (err) {
        res.status(500).send('Error adding user to database');
    }
};
