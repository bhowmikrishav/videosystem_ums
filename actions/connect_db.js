const mongodb = require('mongodb')
const mongodb_config = require('../manifest/mongodb_config.json')

class DB{
    static async mongodb_video_system(){
        if(DB.mongodb_con) return DB.mongodb_con.db(mongodb_config.video_system.name)
        DB.mongodb_con = await DB.mongodb_client.connect()
        return DB.mongodb_con.db(mongodb_config.video_system.name)
    }
}
DB.mongodb_con = null
DB.mongodb_client = new mongodb.MongoClient(
    mongodb_config.video_system.uri,
    mongodb_config.video_system.config
);
DB.mongodb_client.connect()
.then(con => DB.mongodb_con = con)
.catch( err => console.log(err))

module.exports = {DB}