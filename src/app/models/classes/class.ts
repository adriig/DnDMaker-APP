import { Stats } from "../character/stats";
import { Habilidades } from "../character/skills";

export class Clase {
    public _id: number;
    public _Nombre: string;
    public _Habilidades: Array<Habilidades>;
    public _PG: Array<String>;
    public _Salvacion: Array<String>;

    public constructor(id: number, Nombre: string, Habilidades: Array<Habilidades>, PG: Array<String>, Salvacion: Array<String> ){
        this._id=id
        this._Nombre=Nombre;
        this._Habilidades = Habilidades;
        this._PG = PG;
        this._Salvacion = Salvacion;
        this._Habilidades = Habilidades
    }
}