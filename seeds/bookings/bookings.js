const bookingsJson = require("./bookings.json");
const bookingModel = require("../../models/booking");

const createBookings= async () => {
    await userModel.create(usersJson);
    console.log(`Created bookings`);
};

// const addCreatedByField = async () => {
//     await userModel.updateMany(
//         {}, 
//         { $set: { image: " " , about_me : " "} },
//         { new: true }
//     )

// console.log("addCreatedByField")
// };

module.exports = createBookings();