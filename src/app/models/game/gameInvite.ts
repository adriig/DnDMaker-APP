export class GameInvite {

    public _id: string;
    public gameId: string;
    public host: string;
    public invited: string;
    public createdAt: Date;
  
    public constructor(id: string, gameId: string, host: string, invited: string, createdAt: Date) {
      this._id = id
      this.gameId = gameId;
      this.host = host;
      this.invited = invited;
      this.createdAt = createdAt;
    }
  }