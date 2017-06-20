export class DataFieldsObject {
    
    private obj: any = {};

    constructor(obj: any) {
        this.obj = obj;
    }

    addField(key: string, value: any): void {
        this.obj[key] = value;
    }

    removeField(key: string): void {
        delete this.obj[key];
    }

    getValue(key: string): string {
        return this.obj[key];
    }

    setValue(key: string, value: string): void {
        this.obj[key] = value;
    }

    get keys(): string[] {
        let keys: string[] = [];
        for (let key in this.obj) {
            keys.push(key);
        }
        return keys;
    }

    get fields(): DataField[] {
        let fields: DataField[] = [];
        for (let key of this.keys) {
            fields.push(new DataField(key, this.obj[key]));
        }
        return fields;
    }

    public toJSON = () => {
        return this.obj;
    }

} // class DataFieldsObject

export class DataField {
    public key: string;
    public value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}  // class DataField