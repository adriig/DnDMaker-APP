export class Game {

    public _id: string;
    public _name: string;
    public _owner: string;
    public _maxPlayers: number;
    public _createdAt: Date;
    public _participants: Array<string>;
  
    public constructor(id: string, name: string, owner: string, maxPlayers: number, createdAt: Date, participants: Array<string>) {
      this._id = id
      this._name = name;
      this._owner = owner;
      this._maxPlayers = maxPlayers;
      this._createdAt = createdAt;
      this._participants = participants;
    }
  }