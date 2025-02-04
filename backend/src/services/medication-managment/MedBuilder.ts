import { Med } from "backend/types";

export default class MedBuilder {

    private _med: Partial<Med>;

    constructor() {
        this._med = {};
    };

    public fromMed(med: {
        medId: number | null,
        name: string | null,
        category: string | null,
        description: string | null
    }): this {
        this._med.medId = med.medId;
        this._med.name = med.name;
        this._med.category = med.category;
        this._med.description = med.description;
        return this;
    };

    public setMedId(medId: number): this {
        this._med.medId = medId;
        return this;
    };

    public setName(name: string | null): this {
        this._med.name = name;
        return this;
    };
    
    public setCategory(category: string | null): this {
        this._med.category = category;
        return this;
    };

    public setDescription(description: string | null): this {
        this._med.description = description;
        return this;
    };

    public buildMed(): Med {
        if(!this._med.medId) {
            throw new Error("Missing requried fields: medId.");
        } else {
            return this._med as Med;
        };
    };

    public reset(): this {
        this._med = {};
        return this;
    };
};
