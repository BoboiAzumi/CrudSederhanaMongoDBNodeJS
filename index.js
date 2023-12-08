const express = require("express");
const { findFromCollection, findFromCollectionBy } = require("./db/find");
const { InsertIntoCollection } = require("./db/insert");
const { ObjectId } = require("mongodb");
const { updateCollection } = require("./db/update");
const { deleteFromCollection } = require("./db/delete");
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    const findAll = new Promise((resolve, reject) => {
        findFromCollection((err, res) => {
            if (err) reject(err);

            resolve(res)
        })
    })

    findAll.then((result) => {
        collection = result
        const objectRender = {
            collection,
            src: ""
        }
        res.render("index.ejs", objectRender)
    }).catch((err) => {
        res.render("error.ejs", {error:err.toString()})
    })
})

app.get("/add", async (req, res) => {
    res.render("add.ejs")
})

app.post("/addprocess", async (req, res) => {
    const obj = {
        nama: req.body.nama,
        kelas: req.body.kelas
    }

    InsertIntoCollection(obj, (err, result) => {
        if(err){
            res.render("error.ejs", {error: err.toString()})
        }
        else{
            res.redirect("/")
        }
    })
})

app.get("/update/:id", async (req, res) => {
    const id = req.params.id

    const find = new Promise((resolve, reject) => {
        findFromCollectionBy({_id: new ObjectId(id)}, (err, res) => {
            if (err) reject(err);

            resolve(res)
        })
    })

    find.then((result) => {
        collection = result
        const objectRender = {
            collection,
            src: ""
        }
        res.render("edit.ejs", objectRender)
    }).catch((err) => {
        res.render("error.ejs", {error: err.toString()})
    })
})

app.post("/updateprocess/:id", async (req, res) => {
    const id = req.params.id
    const obj = {
        nama: req.body.nama,
        kelas: req.body.kelas
    }

    updateCollection({_id: new ObjectId(id)}, obj, (err, result) => {
        if(err){
            res.render("error.ejs", {error: err.toString()})
        }
        else{
            res.redirect("/")
        }
    })
})

app.get("/delete/:id", async (req, res) => {
    const id = req.params.id

    deleteFromCollection({_id: new ObjectId(id)}, (err, result) => {
        if(err){
            res.render("error.ejs", {error: err.toString()})
        }
        else{
            res.redirect("/")
        }
    })
})

app.get("/search", async (req, res) => {
    let src = req.query.q

    if(src == ""){
        res.redirect("/")
    }
    else{
        src = new RegExp(src, "i")

        const findAll = new Promise((resolve, reject) => {
            findFromCollectionBy({nama: src}, (err, res) => {
                if (err) reject(err);
    
                resolve(res)
            })
        })
    
        findAll.then((result) => {
            collection = result
            const objectRender = {
                collection,
                src: req.query.q
            }
            res.render("index.ejs", objectRender)
        }).catch((err) => {
            res.render("error.ejs", {error: err.toString()})
        })
    }
})

app.listen(1500, () => console.log("Server berjalan di http://localhost:1500"))