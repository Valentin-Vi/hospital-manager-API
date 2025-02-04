import { Stock, Item, Med } from 'backend/types';

export default class StockBuilder {

    private _stock: Partial<Stock>;

    constructor() {
        this._stock = {};
    };

    public fromStock(stock: {
        stockId: number,
        itemId: number | null,
        medId: number | null,
        quantity: number | null,
        cost: number | null,
        updatedAt: Date | null,
    }): this {
        if(stock.itemId && !stock.medId) {
            this._stock.stockId = stock.stockId;
            this._stock.itemId = stock.itemId;
            this._stock.medId = stock.medId;
            this._stock.quantity = stock.quantity;
            this._stock.cost = stock.cost;
            this._stock.updatedAt = stock.updatedAt;
        } else if(!stock.itemId && stock.medId) {
            this._stock.stockId = stock.stockId;
            this._stock.medId = stock.medId;
            this._stock.quantity = stock.quantity;
            this._stock.cost = stock.cost;
            this._stock.updatedAt = stock.updatedAt;
        };
        return this;
    };

    public fromMedStock(stock: {
        stockId: number,
        itemId: null,
        medId: number | null,
        quantity: number | null,
        cost: number | null,
        updatedAt: Date | null,
    }): this {
        this._stock.stockId = stock.stockId;
        this._stock.medId = stock.medId;
        this._stock.quantity = stock.quantity;
        this._stock.cost = stock.cost;
        this._stock.updatedAt = stock.updatedAt;
        return this;
    };

    public fromItemStock(stock: {
        stockId: number,
        itemId: number | null,
        medId: null,
        quantity: number | null,
        cost: number | null,
        updatedAt: Date | null,
    }): this {
        this._stock.stockId = stock.stockId;
        this._stock.itemId = stock.itemId;
        this._stock.medId = stock.medId;
        this._stock.quantity = stock.quantity;
        this._stock.cost = stock.cost;
        this._stock.updatedAt = stock.updatedAt;
        return this;
    };

    public setStockId(stockId: number): this {
        this._stock.stockId = stockId;
        return this;
    };

    public setItemId(itemId: number): this {
        this._stock.itemId = itemId;
        return this;
    };

    public medId(medId: number): this {
        this._stock.medId = medId;
        return this;
    };

    public setItem(item: Item): this {
        this._stock.item = item;
        return this;
    };

    public setMed(med: Med): this {
        this._stock.med = med;
        return this;
    };

    public setQuantity(quantity: number): this {
        this._stock.quantity = quantity;
        return this;
    };

    public setCost(cost: number): this {
        this._stock.cost = cost;
        return this;
    };

    public setUpdatedAt(updatedAt: Date): this {
        this._stock.updatedAt = updatedAt;
        return this;
    };

    public buildStock(): Stock {
        if(!this._stock.stockId) {
            throw new Error("Missing required fields: stockId");
        } else {
            return this._stock as Stock;
        };
    };

    public reset(): this {
        this._stock = {};
        return this;
    };
};