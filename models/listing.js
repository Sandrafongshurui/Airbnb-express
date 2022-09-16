const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default:"No description"
    },
    property_type: {
      type: String,
      //required: true
      default:"Property type is Private"
    },
    accommodates: {
      type: Number,
      required: true,
      default:0

    },
    bedrooms: {
      type: Number,
      required: true,
      default:0
    },
    beds: {
      type: Number,
      required: true,
      default:0
    },
    bathrooms: {
      type: Schema.Types.Mixed,
      required: true,
      default:"-"
    },
    amenities: [
      {
        type: String,
        enum: [
        "TV",
        "Cable TV",
        "Internet",
        "Wifi",
        "Air conditioning",
        "Pool",
        "Kitchen",
        "Free parking on premises",
        "Doorman",
        "Gym",
        "Elevator",
        "Buzzer/wireless intercom",
        "Family/kid friendly",
        "Washer",
        "Essentials",
        "24-hour check-in"
        ],
        default:"No amenities"
      },
    ],
    price: {
      type: Schema.Types.Mixed,
      required: true,
      default:"-"
    },
    images_url: [
      {
        type: String,
        //required: true,
        default:"-"
      },     
    ],
    address_1: {
      type: String,
      required: true,
      default:"-"
    },
    address_2: {
      //this is only exposed to customer after reservation
      type: String,
      default:"-"
    },
    postal_code: {
      type: Number,
      required: true,
      default:"-"
    },
    state: {
      type: String,
      required: true,
      default:"-"
    },
    country: {
      type: String,
      required: true,
      default:"-"
    },
    longtitude: {
      type: Schema.Types.Mixed,
      default:"-"
    },
    latitude: {
      type: Schema.Types.Mixed,
      default:"-"
    },
    unavailable_dates: [
      [{
        type: Date,
      }]
    ],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: mongoose.Types.ObjectId("630f9ca501b6bed58f47cee6"), //harry potter user
    }
},
{ timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
