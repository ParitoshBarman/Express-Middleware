const express = require("express");
const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })

const upload = multer({ storage:storage })

const app = express();


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "./templates/index.html"));
})

app.post("/upload", upload.single("fileup"), (req, res)=>{
    console.log(req.file)
    console.log(req.body)
    res.status(200).json({
        "message": "file uploaded successfully",
        "imageUrl" : req.file.path
     })
})




app.listen(8080, ()=>{
    console.log("Server is running on 8080 ....");
})