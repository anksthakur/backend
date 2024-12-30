import { MongoClient, Db } from 'mongodb';

const url: string = 'mongodb://localhost:27017'; // MongoDB connection string
const dbName: string = 'mydb'; // database name

let dbClient: MongoClient | null = null;

//connect to MongoDB
export const connectToMongoDB = async (): Promise<void> => {
    try {
        dbClient = await MongoClient.connect(url);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the application if the connection fails
    }
};

//get the database client
export const getDb = (): Db => {
    if (!dbClient) {
        throw new Error('Database connection is not established');
    }
    return dbClient.db(dbName);
};
