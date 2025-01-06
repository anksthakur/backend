import express from 'express';
import cors from "cors";
import connectDbMongo from './config/db';
import userRoutes from './routes/userRoutes';
import slotRouter from './routes/slotRoutes';
import routerUser from './routes/userData';
const app = express();
const PORT = 5001;

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
app.use('/', slotRouter);
app.use('/', routerUser)

// Connect to MongoDB 
connectDbMongo();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
