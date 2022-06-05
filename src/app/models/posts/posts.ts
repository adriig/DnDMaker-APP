import {Comments} from './comments'

export class Posts {
    public _id: string;
    public _Titulo: string;
    public _Texto: string;
    public _Likes: Array<string>;
    public _Dislikes: Array<string>;
    public _Date: Date;
    public _Tipo: string;
    public _IdOwner: string;
    public _Comentarios: Array<Comments>

    public constructor(id: string, Titulo: string, Texto: string, Likes: Array<string>, Dislikes: Array<string>, Date: Date, Tipo: string, IdOwner: string, Comentarios: Array<Comments>){
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

    existReaction(value: string) {
        for(let i=0; i<this._Likes.length; i++) {
            console.log(this._Likes[i]+" "+value)
            if(this._Likes[i]==value) {
                return 1
            }
        }
        for(let i=0; i<this._Dislikes.length; i++) {
            if(this._Dislikes[i]==value) {
                return -1
            }
        }
        return 0
    }
}