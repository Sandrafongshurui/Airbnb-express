//const listingsJson = require("./listings.json");
const listingsJson = require("./data.json");
const latLongJson = require("./latlong.json");
const listingModel = require("../../models/listing");
const axios = require("axios")
require('dotenv').config()
const newLatLong =[]

const createListings = async () => {
  try {
    console.log(`Creating listingss`);
    await listingModel.deleteMany({})
    await listingModel.create(listingsJson);
    console.log(`Created listingss`);
  } catch (error) {
    console.log(`---->`,error);
  }
       
};

const renameField = async () => {
    await listingModel.updateMany(
        {}, 
        { $rename: { "address_2" : "state"} }     
    )
    console.log("rename")
}

const addField = async () => {
  await listingModel.updateMany(
      {}, 
      { $set: { "address_2" : " "} },
      {new: true}
  )
  console.log("addField ")
}

// const updateField = async () => {
//   await listingModel.updateMany(
//       {}, 
//       { $set: { "address_1" : element } },
//       {new: true}
//   )
//   console.log("addField ")
// }

const createCoordinates = () => {
  latLongJson.forEach((element)=>{
    newLatLong.push(`${element.latitude.$numberDecimal},${element.longtitude.$numberDecimal}`)
  })
  getAddressFromCoord()
}

const getAddressFromCoord = () => {
  newLatLong.forEach((coordinates)=>{
    fetchAddressApi(coordinates)
  })
}

const fetchAddressApi = async (coordinates) => {
  try {
    const res = await axios.get(`http://api.positionstack.com/v1/reverse?access_key=f36dd7172cd674894aa4d8c9b057d31c&query=${coordinates}&limit=1`)
    const data = res.data.data
    listingsJson.forEach(element=>{
      // if(data[0].label == "undefined"){
      //   element.address_1 = " "
      // }else{
      //   element.address_1 = data[0].label
      // }
      element.address_1 = data[0].label
    })
    //console.log(listingsJson)
    //create new listings with the addresss filled
    createListings(listingsJson)

  } catch (error) {
    console.log("error", error)
  }

}


 
//done after exported listingV1
const switchFields = async (arr) => {
    arr.forEach(element => {
      let street = element.address.street
      let country = element.address.country
      let longtitude= element.address.location.coordinates[0]//long
      let latitude = element.address.location.coordinates[1]//lat
      let image = element.images[0].picture_url
    
      element.street = street
      element.country = country
      element.longtitude= longtitude
      element.latitude= latitude
      element.images_url.push(image) 

  
      //remove unwanted fields
      delete element.address
      delete element.images
    });
  

    await listingModel.deleteMany({})
    await listingModel.create(arr);

    console.log(`Created listingss`);

  };
  



module.exports = createCoordinates();;
