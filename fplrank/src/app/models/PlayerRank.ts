export class FplPlayerRank {
    current : GameweekScore[];

    constructor(current : GameweekScore[]){
        this.current = current;
    }
}

export class GameweekScore {
    bank : number;
    event : number;
    event_transfers : number;
    event_transfers_cost : number;
    overall_rank : number;
    points : number;
    points_on_bench : number;
    rank : number;
    rank_sort: number;
    total_points : number;
    value : number;
}

export class Node {
    name : string;
    series : Series [];

    constructor(name : string, series : Series[]){
        this.name = name;
        this.series = series;
    }
}

export class Series {
    value : number;
    name : string; 

    constructor(value : number, name : string){
        this.value = value;
        this.name = name;
    }
}