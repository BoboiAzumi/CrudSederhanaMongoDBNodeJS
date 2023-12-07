const { MongoClient } = require("mongodb")
require("dotenv").config()

const HOST = process.env.host;
const PORT = process.env.port;
const DB = process.env.db;
const URL = "mongodb://"+HOST+":"+PORT+"/"

const Mongo = new MongoClient(URL)

async function connect(callback){
    try{
        await Mongo.connect();
        const db = await Mongo.db(DB);

        callback(null, db, Mongo);
    }
    catch{
        callback(new Error("Gagal Menyambungkan MongoDB"), null, null);
    }
}

async function isCollectionExist(db, collection, callback){
    try{
        const listCollection = await db.listCollections().toArray()

        const isExist = listCollection.some((collections) => collections.name === collection)

        if(isExist){
            callback(null, true)
        }
        else{
            callback(null, false)
        }
    }
    catch(error){
        callback(error, null);
    }
}

module.exports = {
    connect,
    isCollectionExist
}