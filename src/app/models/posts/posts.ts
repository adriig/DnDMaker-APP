import {Comments} from './comments'

export class Posts {
    public _id: number;
    public _Titulo: string;
    public _Texto: string;
    public _Likes: number;
    public _Dislikes: number;
    public _Date: Date;
    public _Tipo: string;
    public _IdOwner: string;
    public _Comentarios: Array<Comments>

    public constructor(id: number, Titulo: string, Texto: string, Likes: number, Dislikes: number, Date: Date, Tipo: string, IdOwner: string, Comentarios: Array<Comments>){
        this._id=id
        this._Titulo=Titulo;
        this._Texto = Texto
        this._Likes = Likes;
        this._Dislikes = Dislikes;
        this._Date = Date
        this._Tipo = Tipo
        this._IdOwner = IdOwner
        this._Comentarios = Comentarios
    }
}