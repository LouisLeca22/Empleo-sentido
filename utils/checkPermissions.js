import { StatusCodes } from "http-status-codes"
import CustomAPIError from "../errors/custom-api.js"

const checkPermissions = (requestUser, ressourceUserId) => {
    if(requestUser.userId === ressourceUserId.toString()) return 
    throw new CustomAPIError("sin autorización", StatusCodes.UNAUTHORIZED)
}

export default checkPermissions