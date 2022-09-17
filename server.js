require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const listingRouter = require('./routers/listing_routes')
const userRouter = require('./routers/user_routes')



const app = express()
const port = process.env.PORT || 8000
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}.pufdenf.mongodb.net/`


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors({
  origin: '*'
}))

app.use('/api/v1', listingRouter)
app.use('/api/v1/user', userRouter)


// const imagekit = new ImageKit({
//     urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
//     publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
//     privateKey: process.env.IMAGEKIT_KEY,
//   });

// app.post("/imagekit/auth", upload.single("file"), function async (req, res) {
//     console.log(req.body)
//     if(req.file){//multer midleware allows the req.file to come through
//         console.log("have req.file")
//         console.log(req.file)
//         console.log(req.file.buffer)
//         imagekit.upload({
//               file: req.file.buffer, 
//               fileName: req.file.originalname, //required
//               folder: "listing_images"
//             },
//               //have their own inbuilt trycatch
//               function(err, response) {
//                 if(err) {
//                   return res.status(500).json({
//                     status: "failed",
//                     message: "An error occured during file upload. Please try again."
//                   })
//                 }else{
//                     res.status(200).json({
//                         status: "sucess",
//                         message: "Successfully created"
//                       })
//                     console.log("------>", response)

//                 }
               
//             })
//     }else{
//         console.log("no req.file")
//     }})
       

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: process.env.MONGO_DB })
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Airbnb backend listening on port ${port}`)
})
