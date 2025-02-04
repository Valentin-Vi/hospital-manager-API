import { Router } from "express"
import {ClientController} from "backend";

const endpoint = Router()
const client = new ClientController();

endpoint.post('/store', client.store);
endpoint.post('/find', client.find);
endpoint.post('/update', client.update);
endpoint.post('/remove', client.remove);

export default endpoint;
