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
        const keys: string[] = [];
        for (const key in this.obj) {
            keys.push(key);
        }
        return keys;
    }

    get fields(): DataField[] {
        const fields: DataField[] = [];
        for (const key of this.keys) {
            fields.push(new DataField(key, this.obj[key]));
        }
        return fields;
    }

    public toJSON = () => {
        return this.obj;
    }

}

export class DataField {
    public key: string;
    public value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

// export class StringList {
//     readonly list: string[];
//     constructor(strings: string[]) { this.list = strings; }
// }

export class ListContainer<T> {
    readonly list: T[];
    constructor(list: T[]) { this.list = list; }
}