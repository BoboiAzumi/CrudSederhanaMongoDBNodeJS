const { connect, isCollectionExist } = require("./connect.js")

function deleteFromCollection(objCondition, callback){
    connect(async (err, db, client) => {
        if (err) throw err;
        try{
            isCollectionExist(db, "Koleksi", async (error, res) => {
                if (error) throw error;

                if(res){
                    try{
                        const collection = await db.collection("Koleksi");

                        await collection.deleteOne(objCondition)

                        callback(null, true)

                        client.close()
                    }
                    catch(emsg){
                        callback(emsg, null)
                    }
                }
                else{
                    try{
                        callback(null, false)

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
    deleteFromCollection
}