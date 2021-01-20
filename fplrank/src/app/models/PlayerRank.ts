import { GameweekScore } from "./GameweekScore";

export class FplPlayer{
    id : number;
    name : string;
    scores : GameweekScore[]

    constructor(id : number, name : string, scores : GameweekScore[]){
        this.id = id;
        this.name = name;
        this.scores = scores;
    }
}


