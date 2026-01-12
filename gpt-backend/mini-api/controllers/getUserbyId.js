import User from "../models/user.model.js";

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch {
    res.status(400).json({ message: "Invalid user ID" });
  }
};

export default getUserById;
