import { Clase } from "../classes/class";
import { Stats } from "./stats";
import { Estadisticas } from "./stats";
import { Habilidades } from "./skills";
import { Raza } from "../races/races";
import { Hechizos } from "../spells/spell";

export class Personaje {
    public _id: number
    public _NombrePersonaje: string;
    public _Alineacion: string;
    public _Personalidad: string;
    public _Raza: Raza;
    public _Clase: Clase;
    public _Hechizos: Hechizos;
    public _Estadisticas: Estadisticas;
    public _Habilidades: Habilidades;

    public constructor(id: number, NombrePersonaje: string, Alineacion: string, Personalidad: string, Raza: Raza, Clase: Clase, Hechizos: Hechizos, Estadisticas: Estadisticas, Habilidades: Habilidades) {
        this._id=id
        this._NombrePersonaje=NombrePersonaje;
        this._Alineacion = Alineacion;
        this._Personalidad = Personalidad;
        this._Raza = Raza;
        this._Clase = Clase;
        this._Hechizos = Hechizos
        this._Estadisticas = Estadisticas
        this._Habilidades = Habilidades
    }
}