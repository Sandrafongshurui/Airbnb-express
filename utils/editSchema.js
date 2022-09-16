// const dataJson = require("./data.json");
// const listingModel = require("../models/listing");


// const switchFields = (arr) => {
//   arr.forEach(element => {
//     let street = element.address.street
//     let country = element.address.country
//     let longtitude= element.address.location.coordinates[0]//long
//     let latitude = element.address.location.coordinates[1]//lat
//     let image = element.images[0].picture_url
  
//     element.street = street
//     element.country = country
//     element.longtitude= longtitude
//     element.latitude= latitude
//     element.images_url.push(image) 

//     //remove unwanted fields
//     delete element.address
//     delete element.images
//   });

//   createListing()
// };

// const createListing = async () => {

//   await listingModel.deleteMany({})
//   await listingModel.create(dataJson);

//   console.log(`Created listingss`);
// };

// switchFields(dataJson);