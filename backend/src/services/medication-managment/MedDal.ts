import { Med, MedCreate, MedUpdate } from 'backend/types';
import MedBuilder from './MedBuilder';
import { PrismaClient } from '@prisma/client';

export default class MedDal {
    
    private _db: PrismaClient;
    private _builder: MedBuilder;

    constructor() {
        this._db = new PrismaClient();
        this._builder = new MedBuilder();
    };

    public async store(
        med: MedCreate
    ): Promise<Med | null> {
        try {
            const storedMed = await this._db.med.create({
                data: {
                    name: med.name,
                    category: med.category,
                    description: med.description
                }
            });

            return this._builder
            .fromMed(storedMed)
            .buildMed();
        } catch(err) {
            console.error(err);
            return null;
        };
    };

    public async findById(
        medId: number
    ): Promise<Med | null> {
        try {
            const foundMed = await this._db.med.findUnique({
                where: { medId }
            });
            if(foundMed) {
                return this._builder
                .fromMed(foundMed)
                .buildMed();
            } else {
                return null;
            };
        } catch(err) {
            console.error(err);
            return null;
        };
    };

    public async update (
        med: MedUpdate
    ): Promise<Med | null> {
        try {
            const updatedMed = await this._db.med.update({
                where: { medId: med.medId },
                data: med
            });
            if(updatedMed) {
                return this._builder
                .fromMed(updatedMed)
                .buildMed();
            } else {
                return null;
            };
        } catch(err) {
            console.error(err);
            return null;
        };
    };

    public async remove (
        medId: number
    ): Promise<Med | null> {
        try {
            const removedMed = await this._db.med.delete({
                where: { medId }
            });
            if(removedMed) {
                return this._builder
                .fromMed(removedMed)
                .buildMed();
            } else {
                return null;
            };
        } catch(err) {
            console.error(err);
            return null;
        };
    };
};