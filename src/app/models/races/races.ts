import { Stats } from "../character/stats";
import { Habilidades } from "../character/skills";

export class Raza {
    public _id: number;
    public _NombreRaza: string;
    public _Multiplicadores: Array<Stats>;
    public _Habilidades: Array<Habilidades>;
    public _Origen: string;
    public _Nombres: Array<String>;

    public constructor(id: number, NombreRaza: string, Multiplicadores: Array<Stats>, Habilidades: Array<Habilidades>, Origen: string, Nombres: Array<String>){
        this._id=id
        this._NombreRaza=NombreRaza;
        this._Multiplicadores = Multiplicadores;
        this._Habilidades = Habilidades;
        this._Origen = Origen;
        this._Nombres = Nombres
    }
}