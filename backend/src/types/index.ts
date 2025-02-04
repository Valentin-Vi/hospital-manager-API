import Client, { SafeClient, ClientCreate, ClientUpdate } from './Client';
import Desk, { DeskCreate } from './Desk';
import Doctor, { DoctorCreate, DoctorUpdate } from './Doctor';
import Visit, { VisitCreate, VisitUpdate } from './Visit';
import Item, { ItemCreate, ItemUpdate } from './Item';
import Med, { MedCreate, MedUpdate } from './Med';
import Stock, { ItemStock, MedStock } from './Stock';
import StockHistory from './StockHistory';

export {
    Client, SafeClient, ClientCreate, ClientUpdate,
    Desk, DeskCreate,
    Doctor, DoctorCreate, DoctorUpdate,
    Visit, VisitCreate, VisitUpdate,
    Item, ItemCreate, ItemUpdate,
    Med, MedCreate, MedUpdate,
    Stock, StockHistory, MedStock, ItemStock
};
