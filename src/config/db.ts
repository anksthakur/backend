import mongoose from 'mongoose';

// MongoDB connection
const connectDbMongo = async (): Promise<void> => {
  try {
    const dbURI ='mongodb://localhost:27017/crud';
    await mongoose.connect(dbURI);
    console.log('MongoDB connected crud');
  } catch (error) {
    console.error('Error connecting to MongoDB :', error);
    process.exit(1);
  }
};

export default connectDbMongo;