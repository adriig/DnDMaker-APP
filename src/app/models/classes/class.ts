import { Stats } from "../character/stats";
import { Habilidades } from "../character/skills";

export class Clase {
    public _id: number;
    public _Nombre: string;
    public _Habilidades: Array<Habilidades>;
    public _Descripcion: string;
    public _PG: Array<String>;
    public _Salvacion: Array<String>;
    public _IdOwner: String;
    public _Public: Boolean;
    public _Type: String;

    public constructor(id: number, Nombre: string, Habilidades: Array<Habilidades>, PG: Array<String>, Salvacion: Array<String>, Descripcion: string, IdOwner: string, Public: Boolean, Type: String){
        this._id=id
        this._Nombre=Nombre;
        this._Habilidades = Habilidades;
        this._Descripcion = Descripcion;
        this._PG = PG;
        this._Salvacion = Salvacion;
        this._Habilidades = Habilidades
        this._IdOwner = IdOwner
        this._Public = Public;
        this._Type = Type
    }
}