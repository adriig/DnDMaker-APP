import { Habilidades } from "../character/skills";
import { Stats } from "../character/stats";
import { Raza } from "./races";

export class SubRaza extends Raza {
    public _RazaDependiente: string;
    public _OrigenSubRaza: string;
    
    public constructor(_id: number, _NombreRaza: string, _Multiplicadores: Array<Stats>, _Habilidades: Array<Habilidades>, _Origen: string, _Subtipo: string, _Nombres: Array<String>, RazaDependiente: string, OrigenSubRaza: string, _IdOwner: string) {
        super(_id, _NombreRaza, _Multiplicadores, _Habilidades, _Origen, _Nombres, _IdOwner);
        this._RazaDependiente = RazaDependiente;
        this._OrigenSubRaza=OrigenSubRaza
    }
}