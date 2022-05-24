export class Users {
    _id: string;
    _Nombre: string;
    _ClassesSelected: Array<string>;
    _RacesSelected: Array<string>;
    constructor(_id: string, _ClassesSelected: Array<string>, _RacesSelected: Array<string>) {
        this._id = _id,
        this._Nombre = this.generateName(),
        this._ClassesSelected = _ClassesSelected,
        this._RacesSelected = _RacesSelected
    }

    set setname(newName: string) {
        this._Nombre=newName;
    }

    generateName() {
        let Availables=["magician", "warrior", "knight", "killer", "assasin", "king", "destroyer"]
        let item=Availables[Math.floor(Math.random()*Availables.length)]
        let randomNum = Math.floor(Math.random()*(999999 - 1)+1)
        let nombreNuevo=item.concat('-', String(randomNum));
        return nombreNuevo
    }
  }