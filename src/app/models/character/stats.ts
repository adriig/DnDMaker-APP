export class Estadisticas {
    public _MainStats: Array<Stats>;
    public _Saving: Array<Stats>;
    public _Skills: Array<Stats>;

    public constructor(MainStats: Array<Stats>, Saving: Array<Stats>, Skills: Array<Stats>){
        this._MainStats=MainStats;
        this._Saving = Saving;
        this._Skills = Skills;
    }
}

export class Stats {
    id: string; 
    type: string; 
    value: number;

    constructor(id: string, type: string, value: number) {
        this.id = id,
        this.type = type,
        this.value = value
    }
  }