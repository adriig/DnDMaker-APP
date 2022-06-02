export class Comments {
    public _id: number;
    public _IdOwner: string;
    public _Date: Date;
    public _Texto: string;

    public constructor(id: number, IdOwner: string, Fecha: Date, Texto: string){
        this._id=id
        this._IdOwner = IdOwner
        this._Date = Fecha
        this._Texto = Texto
    }
}