import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import router from './routes/app.routes';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';



const app = express();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(router);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});