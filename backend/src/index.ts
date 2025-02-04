import DeskController from './services/desk-managment/DeskController';
import DeskService from './services/desk-managment/DeskService';
import DeskBuilder from './services/desk-managment/DeskBuilder'
import DeskDal from './services/desk-managment/DeskDal';

import ClientController from './services/client-management/ClientController';
import ClientService from './services/client-management/ClientService';
import ClientBuilder from './services/client-management/ClientBuilder';
import ClientDal from './services/client-management/ClientDal';

import DoctorBuilder from './services/doctor-managment/DoctorBuilder';

export {
    DeskController, DeskService, DeskBuilder, DeskDal,
    ClientController, ClientService, ClientBuilder, ClientDal,
    DoctorBuilder
};
