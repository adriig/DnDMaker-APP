export class GameRequest {

    public _id: string;
    public _requester: string;
    public _gameId: string;
    public _createdAt: Date;
  
    public constructor(id: string, requester: string, gameId: string, createdAt: Date) {
      this._id = id
      this._requester = requester;
      this._gameId = gameId;
      this._createdAt = createdAt;
    }
  }