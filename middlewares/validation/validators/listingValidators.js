const yup = require("yup");

const validators = {
  listListings: yup.object({
    query: yup.object({
      country: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    }),
  }),
  createListing: yup.object({
    body: yup.object({
      name: yup.string().required(),
      description: yup.string().required("description is required"),
      property_type: yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      accommodates: yup.number().required().min(1, "Min value 1."),
      bedrooms: yup.number().required(),
      beds: yup.number().required(),
      bathrooms: yup.number().required(),
      amenities: yup.string(),
      price: yup.number().required(),
      images_url: yup.string(),
      address_1: yup.string().required(),
      address_2: yup.string(),
      postal_code: yup.number().required(),
      state: yup
        .string()
        .required()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      country: yup
        .string()
        .required()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    }),
  }),

  params_id: yup.object({
    params: yup.object({
      _id: yup
        .string()
        .required()
        .matches(/^([A-Za-z]|[0-9])+$/, "Only alphabets and numbers for listing Id"),
    }),
  }),
  createBooking: yup.object({
    body: yup.object({
      checkin_date: yup.date("Date to be in yyyy-mm-dd format").required(),
      checkout_date: yup.date("Date to be in yyyy-mm-dd format").required(),
      total_guests: yup.number().required().min(1, "Min value 1.").max(10),
      total_price: yup.number().required().min(1, "Min value 1."),
    }),
  }),

};

module.exports = validators;
