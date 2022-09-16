const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  booked_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //default: mongoose.Types.ObjectId("630f9ca501b6bed58f47cee5"), //mickey mouse user
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    //default: mongoose.Types.ObjectId("6316fda9d2571d6d3e58aef6"), //sinagpore house
  },
  checkin_date: {
    type: Date,
    required: true,
  },
  checkout_date: {
    type: Date,
    required: true,
  },
  total_guests: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Schema.Types.Mixed,
    required: true,
  },
},{timestamp:true});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking
