import { DataTypes, Model } from "https://deno.land/x/denodb@v1.2.0/mod.ts";

class PollModel extends Model{
    static table:string = 'polls';
    static timestamps:boolean = true;

    static fields = {
        pollID: { primaryKey: true, unique: true },
        pollUUID: DataTypes.UUID,
        pollGroup: DataTypes.UUID,
        pollStarter: DataTypes.STRING,
        pollQuestion: DataTypes.STRING,
        pollOptions: DataTypes.STRING
    };

    static defaults = {};
}

export default PollModel;