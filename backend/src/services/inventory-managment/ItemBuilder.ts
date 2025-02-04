import { Item } from "backend/types";

export default class ItemBuilder {

    private _item: Partial<Item>;

    constructor() {
        this._item = {};
    };

    public fromItem(item: {
        itemId: number,
        name: string | null,
        category: string | null,
        description: string | null
    }): this {
        this._item.itemId = item.itemId;
        this._item.name = item.name;
        this._item.category = item.category;
        this._item.description = item.description;
        return this;
    };

    public setItemId(itemId: number | null): this {
        this._item.itemId = itemId;
        return this;
    };

    public setName(name: string | null): this {
        this._item.name = name;
        return this;
    };

    public setDescription(description: string | null): this {
        this._item.description = description;
        return this;
    };

    public setCategory(category: string | null): this {
        this._item.category = category;
        return this;
    };

    public buildItem(): Item {
        if(!this._item.itemId) {
            throw new Error("Missing required fields itemId.");
        } else {
            return this._item as Item;
        };
    };

    public reset(): void {
        this._item = {};
    };
};