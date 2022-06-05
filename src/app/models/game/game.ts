export class Game {

  public _id: string;
  public name: string;
  public owner: string;
  public maxPlayers: number;
  public createdAt: Date;
  public participants: Array<string>;

  public constructor(id: string, name: string, owner: string, maxPlayers: number, createdAt: Date, participants: Array<string>) {
    this._id = id
    this.name = name;
    this.owner = owner;
    this.maxPlayers = maxPlayers;
    this.createdAt = createdAt;
    this.participants = participants;
  }
}