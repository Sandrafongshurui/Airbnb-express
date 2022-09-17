const ImageKit = require("imagekit");


// const storage  = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         //ensure that this folder already exists in your project directory
//         cb(null, "fileuploads/");
//     },
//     filename: (req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// });


const imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
    publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
    privateKey: process.env.IMAGEKIT_KEY,
  });


const imageMethods = {
    uploadImage : async (req, res, next) => {
        if(req.file){//multer midleware allows the req.file to come through
            console.log("have req.file")
            console.log(req.file)
            console.log(req.file.buffer)
            imagekit.upload({
                  file: req.file.buffer, 
                  fileName: req.file.originalname, //required
                  folder: "listing_images"
                },
                  //have their own inbuilt trycatch
                  function(err, response) {
                    if(err) {
                      return res.status(500).json({
                        status: "failed",
                        message: "An error occured during file upload. Please try again."
                      })
                    }else{
                        // res.status(200).json({
                        //     status: "sucess",
                        //     message: "Successfully created"
                        //   })
                        console.log("------>", response)
                        console.log("-----> store in dbs", response.thumbnailUrl)
                        req.file.thumbnailUrl = response.thumbnailUrl
                        return next()
                    }
                   
                })
        }else{
            console.log("no req.file")
            return res.status(500).json({
                status: "failed",
                message: "An image is required"
              })
        }
    }
}

module.exports = imageMethods