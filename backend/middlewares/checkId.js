import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400)
      throw new Error(`${req.params.id} is not a valid id`);
    }
    next();
  }

    export default checkId ;
    