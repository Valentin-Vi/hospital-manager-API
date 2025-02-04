import Item from "./Item"
import Med from "./Med"

type Stock = {
    stockId: number | null,
    itemId: number | null,
    item: Item | null,
    medId: number | null,
    med: Med | null,
    quantity: number | null,
    cost: number | null,
    updatedAt: Date | null,
};

type ItemStock = {
    stockId: number | null,
    itemId: number | null,
    item: Item | null,
    medId: null,
    med: null,
    quantity: number | null,
    cost: number | null,
    updatedAt: Date | null,
};

type MedStock = {
    stockId: number | null,
    itemId: null,
    item: null,
    medId: number | null,
    med: Med | null,
    quantity: number | null,
    cost: number | null,
    updatedAt: Date | null,
};

export default Stock;
export { ItemStock, MedStock };
