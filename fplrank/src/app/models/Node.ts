import { Series } from "./Series";


export class Node {
    id : number;
    name: string;
    series: Series[];

    constructor(id: number, name: string, series: Series[]) {
        this.id = id;
        this.name = name;
        this.series = series;
    }
}
