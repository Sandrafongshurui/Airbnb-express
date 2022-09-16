const bookingModel = require("../../models/booking");
const listingModel = require("../../models/listing");
const dateMethods = require("../../utils/dateMethods");
const luxon = require("luxon");
const DateTime = luxon.DateTime;

const bookingController = {
  showListingBookings: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    let listingBookings = null

    try {
      listingBookings = await bookingModel.find({ listing: listingId }).populate({ path: "booked_by" });
      console.log(listingBookings);
      if(!listingBookings){
        return res.status(404).json({ error: "no bookings results" });
      }
      return res.status(201).json(listingBookings);
    } catch (error) {
      return res.status(500).json({ error: "failed to get listing bookings" });
    }

  },
  showTrips: async (req, res) => {
    const userId = res.locals.userAuth.data.userId
    //const userId = "630f9ca501b6bed58f47cee5"; //take from res.local auth?
    let trips = null

    try {
      trips = await bookingModel
        .find({ booked_by: userId })
        .populate({ path: "listing" });
      console.log(trips);
      if(!trips){
        return res.status(404).json({ error: "no trips results" });
      }
      return res.json(trips);
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to list listings" });
    }
  },
  editTrip: async (req, res) => {
    const bookingId = req.params.booking_id; //taken from FE <link> to
    let booking  = null

    try {
      booking = await bookingModel.findByIdAndUpdate(
        { _id: bookingId },
        { $set: { ...req.body } },
        { new: true }
      );
      if (!booking) {
        return res.status(404).json({ error: "Booking not found " });
      }
      console.log(booking);
      return res.status(201).send("Booking Updated Successfully, a notification has been sent to the host");
    } catch (error) {
      return res.status(500).json({ error: "failed to update Booking" });
    }

  },
  deleteTrip: async (req, res) => {
    const bookingId = req.params.booking_id; //taken from FE <link> 
    let booking = null
    let listing = null

    try {
      booking = await bookingModel.findById(bookingId).populate("listing");
      if (!booking) {
        return res.status(404).json({ error: "Booking not found " });
      }

      let idx = booking.listing.unavailable_dates.findIndex(element=> {
       return element[0].toString() == booking.checkin_date.toString()
      });

      listing = await listingModel.findByIdAndUpdate(
        { _id: booking.listing._id },
        {$pull : {unavailable_dates : booking.listing.unavailable_dates[idx]}},
        {new: true}
      );
      if (!listing) {
        return res.status(404).json({ error: "Listing not found " });
      }
      console.log("------->",listing);

      await bookingModel.findByIdAndDelete(bookingId)

      return res.status(201).json("booking deleted Successfully");
    } catch (error) {
      return res.status(500).json({ error: "failed to delete booking" });
    }

  },
  bookTrip: async (req, res) => {
    //const listingId = "6316fda9d2571d6d3e58aef6"
    const listingId = req.params.listing_id; //take from FE link\
    const booked_by = res.locals.userAuth.data.userId
    //const booked_by = "630f9ca501b6bed58f47cee5"; //take from res.local auth?
    let booking = null
    let listing = null
    const dateRangeArray = dateMethods.getDatesInRange(
      req.body.checkin_date,
      req.body.checkout_date
    );
    console.log("----->", dateRangeArray);

    //mongoose will change string date to the iso date in dbs
    try {
      booking = await bookingModel.create({
        ...req.body,
        listing: listingId,
        booked_by,
      });
      if (!booking) {
        return res.status(404).json({ error: "Booking not found " });
      }
      listing = await listingModel.findOneAndUpdate(
        { _id: listingId },
        { $push: { unavailable_dates: dateRangeArray } },
        { new: true }
      );
      if (!listing) {
        return res.status(404).send("Unable to find listing");
      }
      return res.status(201).send("Booking Created Successfully");
    } catch (error) {
      return res.status(500).json({ error: "failed to create booking" });
    }
    
  },
};

module.exports = bookingController;
