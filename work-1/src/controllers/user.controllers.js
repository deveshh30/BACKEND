import { asyncHandler } from "../utils/asyncHandle.js";

const registerUser = asyncHandler( async (req, res) => {
    return res.status(200).json(
        {
            message : "ok"
        }
    )
})