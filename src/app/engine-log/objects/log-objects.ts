export class EngineLogEntry {

    private _ts: Date;
    private _type: string;
    private _entry: any;

    constructor(obj: any) {
        if (typeof obj.ts === "string"){
            this._ts = new Date(obj.ts);
        } else {
            this._ts = obj.ts;
        }

        this._type = obj.type;
        this._entry = obj.entry;
    }

    get ts(): Date { return this._ts }
    get type(): string { return this._type }
    get entry(): any { return this._entry }
    get entryJSON(): string { return JSON.stringify(this._entry) }
}
