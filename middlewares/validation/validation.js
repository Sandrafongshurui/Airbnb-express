
// returns a function
const validationMiddleware = (schema) => async (req, res, next) => {
    console.log(req.query)
    console.log(req.body)
    console.log(req.params)
    const filteredParams = {}
    req.params.listing_id? filteredParams._id = req.params.listing_id : filteredParams._id =  req.params.booking_id
    console.log(filteredParams)
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: filteredParams
      });
      return next();
    } catch (err) {
      console.log(err)
        return res.status(500).json({ type: err.name, path: err.path, message: err.message });
    }
  };

module.exports = validationMiddleware