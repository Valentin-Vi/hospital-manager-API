type Item = {
    itemId: number | null,
    name: string | null,
    category: string | null,
    description: string | null
};

type ItemCreate = {
    itemId: number,
    name: string,
    category: string,
    description: string
};

type ItemUpdate = {
    itemId: number,
    name: string,
    category: string,
    description: string
};

export default Item;
export { ItemCreate, ItemUpdate };
