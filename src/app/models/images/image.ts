export class Images {
    _id: string;
    imagePath: File;
    constructor(_id: string, files: File) {
        this._id = _id,
        this.imagePath = files
    }
}