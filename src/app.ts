import express from 'express';
import connectDbMongo from './config/db';
import userRoutes from './routes/userRoutes';
import cors from "cors";
const app = express();
const PORT = 5001;

// Connect to MongoDB 
connectDbMongo();

//for cors error
var corsOptions = {
    origin: function (origin: any, callback: any) {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));

// to convert the response to json
app.use(express.json());

// Use user routes for API
app.use('/', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
