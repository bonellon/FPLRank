import { GameweekScore } from "./GameweekScore";

export class FplPlayer{
    id : number;
    name : string;
    scores : GameweekScore[];
    totalPoints : number;

    constructor(id : number, name : string, scores : GameweekScore[], totalPoints: number){
        this.id = id;
        this.name = name;
        this.scores = scores;
        this.totalPoints = totalPoints;
    }
}


