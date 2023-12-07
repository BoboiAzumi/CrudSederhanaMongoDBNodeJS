const { connect, isCollectionExist } = require("./connect.js")

async function findFromCollection(callback){
    connect(async (err, db, client) => {
        if (err) throw err;
        try{
            isCollectionExist(db, "Koleksi", async (error, res) => {
                if (error) throw error;

                if(res){
                    try{
                        const collection = await db.collection("Koleksi");

                        const data = await collection.find().toArray()

                        callback(null, data)

                        client.close()
                    }
                    catch(emsg){
                        callback(emsg, null)
                    }
                }
                else{
                    try{
                        callback(null, [])

                        client.close()
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

async function findFromCollectionBy(obj, callback){
    connect(async (err, db, client) => {
        if (err) throw err;
        try{
            isCollectionExist(db, "Koleksi", async (error, res) => {
                if (error) throw error;

                if(res){
                    try{
                        const collection = await db.collection("Koleksi");

                        const data = await collection.find(obj).toArray()

                        callback(null, data)

                        client.close()
                    }
                    catch(emsg){
                        callback(emsg, null)
                    }
                }
                else{
                    try{
                        callback(null, [])

                        client.close()
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
    findFromCollection,
    findFromCollectionBy
}