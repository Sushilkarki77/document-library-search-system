import { chatQueryHandler, searchQueryHandler } from '../controllers/search.controller';
import express from 'express';

export const searchRoutes = express.Router();

searchRoutes.get('', searchQueryHandler);


export const chatRoutes = express.Router();

chatRoutes.get('', chatQueryHandler);
