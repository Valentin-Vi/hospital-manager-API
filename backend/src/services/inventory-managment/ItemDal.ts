import { Item, ItemCreate, ItemUpdate } from "backend/types";
import { PrismaClient } from "@prisma/client";
import ItemBuilder from "./ItemBuilder";

export default class ItemDal {
    
    private _db: PrismaClient;
    private _builder: ItemBuilder;

    constructor() {
        this._db = new PrismaClient();
        this._builder = new ItemBuilder();
    };

    public async store(
        med: ItemCreate
    ): Promise<Item | null> {
        try {
            const storedItem = await this._db.item.create({
                data: {
                    name: med.name,
                    category: med.category,
                    description: med.description
                },
            });

            return this._builder
            .fromItem(storedItem)
            .buildItem();
        } catch(err) {
            console.error(err);
            return null;
        };
    };

    public async findById(
        itemId: number
    ): Promise<Item | null> {
        try {
            const foundItem = await this._db.item.findUnique({
                where: { itemId }
            });
            if(foundItem) {
                return this._builder
                .fromItem(foundItem)
                .buildItem();
            } else {
                return null;
            };
        } catch(err) {
            console.error(err);
            return null;
        };
    };

    public async update (
        med: ItemUpdate
    ): Promise<Item | null> {
        try {
            const updatedItem = await this._db.item.update({
                where: { itemId: med.itemId },
                data: med
            });
            if(updatedItem) {
                return this._builder
                .fromItem(updatedItem)
                .buildItem();
            } else {
                return null;
            };
        } catch(err) {
            console.error(err);
            return null;
        };
    };

    public async remove (
        itemId: number
    ): Promise<Item | null> {
        try {
            const removedItem = await this._db.item.delete({
                where: { itemId }
            });
            if(removedItem) {
                return this._builder
                .fromItem(removedItem)
                .buildItem();
            } else {
                return null;
            };
        } catch(err) {
            console.error(err);
            return null;
        };
    };
};
