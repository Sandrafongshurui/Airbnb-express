const listingModel = require("../../models/listing");
const bookingModel = require("../../models/booking");
// const ImageKit = require("imagekit");

// const imagekit = new ImageKit({
//   urlEndpoint: "https://ik.imagekit.io/ni6j3uv9n",
//   publicKey: "public_POFNB8Fsvsbo11VI2T92PAnSOMY=",
//   privateKey: process.env.IMAGEKIT_KEY,
// });

const listingController = {
  listListings: async (req, res) => {
    let listings = null;
    try {
      if (req.query.country) {
        console.log(req.query.country);
        //find country/state/city that match the req.body, put in an array
        listings = await listingModel.find({ country: req.query.country });
        if (!listings) {
          //find returns array
          return res.status(404).json({ error: "no listing results" });
        }
        return res.json(listings);
      } else {
        console.log("get lists");
        listings = await listingModel.find({}).limit(100).sort([["createdAt", -1]]);
        if (listings.length === 0) {
          //find returns array
          return res.status(404).json({ error: "no listing results" });
        }
        return res.json(listings);
      }
    } catch (error) {
      return res.status(500).json({ error: "failed to list listings" });
    }
  },
  showListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    let listing = null;

    try {
      listing = await listingModel
        .findById({ _id: listingId })
        .select("-__v")
        .populate("created_by");
      if (!listing) {
        return res.status(404).json({ error: "No such listing" });
      }
      return res.json(listing);
    } catch (error) {
      return res.status(500).json({ error: "failed to show listing" });
    }
  },
  listHostListings: async (req, res) => {
    //taken from res.locals.userAuth, verrified at login
    const userId = res.locals.userAuth.data.userId;
    //const userId = "630f9ca501b6bed58f47cee6";//this is harry
    let userListings = null;

    try {
      userListings = await listingModel.find({ created_by: userId });
      if (!userListings) {
        return res.status(404).json({ error: "No such listing" });
      }
      return res.json(userListings);
    } catch (error) {
      return res.status(500).json({ error: "failed to list user listings" });
    }
  },
  createListing: async (req, res) => {
    const userId = res.locals.userAuth.data.userId; //taken from res.locals.userAuth, verrified at login
    console.log(req.file.thumbnailUrl);
    //const userId = "630f9ca501b6bed58f47cee6";
    //   if(req.file){//multer midleware allows the req.file to come through
    //     console.log("have req.file")
    //     console.log(req.file)
    //     console.log(req.file.buffer)
    //     imagekit.upload({
    //           file: req.file.buffer,
    //           fileName: req.file.originalname, //required
    //           folder: "listing_images"
    //         },
    //           //have their own inbuilt trycatch
    //           function(err, response) {
    //             if(err) {
    //               return res.status(500).json({
    //                 status: "failed",
    //                 message: "An error occured during file upload. Please try again."
    //               })
    //             }else{
    //                 // res.status(200).json({
    //                 //     status: "sucess",
    //                 //     message: "Successfully created"
    //                 //   })
    //                 console.log("------>", response)
    //                 console.log("-----> store in dbs", response.thumbnailUrl)

    //             }

    //         })
    // }else{
    //     console.log("no req.file")
    //     return res.status(500).json({
    //         status: "failed",
    //         message: "An image is required"
    //       })
    // }

    let listing = null;

    try {
      //ftech api to convert country/postal code to get long lat in FE
      listing = await listingModel.create({
        ...req.body,
        created_by: userId,
        //long
        //lat
      });
      console.log(listing._id)

      listingImage = await listingModel.findByIdAndUpdate(
        { _id: listing._id },
        { $push: { images_url: req.file.thumbnailUrl } },
        { new: true }
      );

      if (!listing) {
        return res.status(404).json();
      }
      return res.status(201).send("Listing Created Successfully");
    } catch (error) {
      return res.status(500).json({ error: "failed to create listing" });
    }
  },
  editListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    let listing = null;

    try {
      listing = await listingModel.findByIdAndUpdate(
        { _id: listingId },
        { $set: { ...req.body } },
        { new: true }
      );
      if (!listing) {
        return res.status(404).json({ error: "No such listing" });
      }
      return res.status(201).send("Listing Updated Successfully");
    } catch (error) {
      return res.status(500).json({ error: "failed to update listing" });
    }
  },

  deleteListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    let listing = null;

    try {
      const listing = await listingModel.findByIdAndDelete(listingId);
      await bookingModel.deleteMany({ listing: listingId });
      console.log(listing);
      if (!listing) {
        return res.status(404).json({ error: "No listing exists" });
      }
      return res.status(201).json("Listing deleted Successfully");
    } catch (error) {
      return res.status(500).json({ error: "failed to delete listing" });
    }
  },
};

module.exports = listingController;
