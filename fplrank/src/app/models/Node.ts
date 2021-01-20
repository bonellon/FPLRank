import { Series } from "./Series";


export class Node {
    name: string;
    series: Series[];

    constructor(name: string, series: Series[]) {
        this.name = name;
        this.series = series;
    }
}
