//const listingsJson = require("./listings.json");
const listingsJson = require("./data.json");
const latLongJson = require("./latlong.json");
const listingModel = require("../../models/listing");
const axios = require("axios");
const { Console } = require("console");
require('dotenv').config()
const newLatLong =[]
const hundredListings =[]

const createListings = async (listing) => {
  try {
    console.log()
    console.log(`Creating listingss`);
    await listingModel.deleteMany({})
    await listingModel.create({listing});
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

const updateField = async () => {
  await listingModel.updateMany(
      {}, 
      { $set: { "unavailable_dates" : [] } },
      {new: true}
  )
  console.log("addField ")
}

const createCoordinates = async () => {
  latLongJson.forEach((element)=>{
    newLatLong.push(`${element.latitude.$numberDecimal},${element.longtitude.$numberDecimal}`)
  })
  const promises = newLatLong.map( async (coordinates, idx)=>{
    if(idx<=100){
      try {
        const res = await axios.get(`http://api.positionstack.com/v1/reverse?access_key=${process.env.POSITION_STACK_API}&query=${coordinates}&limit=1`)
        //console.log("------>", res.data.data[0].label)
        const data = res.data.data
        // console.log( data[0].label)
        listingsJson[idx].address_1 = res.data.data[0].label
        if(idx === 100){
          console.log( listingsJson[idx].name)
        }
        
        return res.data.data[0].label
    
      } catch (error) {
        console.log("error", error)
      }
    } 
  })
  await Promise.all(promises)
  //console.log(listingsJson)
  //createListings(listingsJson)
  try {
    console.log()
    console.log(`Creating listingss`);
    await listingModel.deleteMany({})
    await listingModel.create(listingsJson);
    console.log(`Created listingss`);
  } catch (error) {
    console.log(`---->`,error);
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
  



module.exports = updateField();
