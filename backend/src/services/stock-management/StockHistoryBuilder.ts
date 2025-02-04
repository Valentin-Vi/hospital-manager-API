import { StockHistory } from "backend/types";

export default class StockHistoryBuilder {

    private _hist: Partial<StockHistory>;

    constructor() {
        this._hist = {};
    };

    public fromHistory(hist: {
        histId: number,
        stockId: number,
        date: Date | null,
        units: number | null
    }): this {
        this._hist.histId = hist.histId;
        this._hist.stockId = hist.stockId;
        this._hist.date = hist.date;
        this._hist.units = hist.units;
        return this;
    };

    public setHistId(histId: number): this {
        this._hist.histId = histId;
        return this;
    };

    public setStockId(stockId: number): this {
        this._hist.stockId = stockId;
        return this;
    };

    public setDate(date: Date): this {
        this._hist.date = date;
        return this;
    };

    public setUnits(units: number): this {
        this._hist.units = units;
        return this;
    };

    public buildStockHistory(): StockHistory {
        if(!this._hist.histId) {
            throw new Error("Missing required field: histId.");
        } else {
            return this._hist as StockHistory;
        };
    };

    public reset(): this {
        this._hist = {}
        return this;
    };
};