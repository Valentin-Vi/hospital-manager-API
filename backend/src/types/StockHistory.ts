import Stock from "./Stock";

type StockHistory = {
    histId: number | null,
    stockId: number | null,
    date: Date | null,
    units: number | null;
};

export default StockHistory;
