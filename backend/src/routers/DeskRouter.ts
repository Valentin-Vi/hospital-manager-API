import { Router } from "express";
import DeskController from "../services/desk-managment/DeskController";

const endpoint = Router();
const desk = new DeskController()

endpoint.post('/store', desk.store);
endpoint.post('/find', desk.find);
endpoint.post('/update', desk.update);
endpoint.post('/remove', desk.remove);

export default desk;
