const { connect, isCollectionExist } = require("./connect.js")

function InsertIntoCollection(obj, callback){
    connect(async (err, db, client) => {
        if (err) throw err;
        try{
            isCollectionExist(db, "Koleksi", async (error, res) => {
                if (error) throw error;

                if(res){
                    try{
                        const collection = await db.collection("Koleksi");

                        await collection.insertOne(obj)

                        callback(null, true)

                        await client.close()
                    }
                    catch(emsg){
                        callback(emsg, null)
                    }
                }
                else{
                    try{
                        await db.createCollection("Koleksi")

                        const collection = await db.collection("Koleksi");

                        await collection.insertOne(obj)

                        callback(null, true)

                        await client.close()
                    }
                    catch(emsg){
                        callback(emsg, null)
                    }
                }
            })
        }
        catch(emsg){
            callback(emsg, null);
        }
    })
}

module.exports = {
    InsertIntoCollection
}