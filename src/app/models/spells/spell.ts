import { Stats } from "../character/stats";
import { Habilidades } from "../character/skills";

export class Hechizos {
    public _id: number;
    public _Nombre: string;
    public _Tipo: string;
    public _Duracion: number;
    public _Descripcion: string;

    public constructor(id: number, Nombre: string, Tipo: string, Duracion: number, Descripcion: string ){
        this._id=id
        this._Nombre=Nombre;
        this._Tipo = Tipo;
        this._Duracion = Duracion;
        this._Descripcion = Descripcion;
    }
}