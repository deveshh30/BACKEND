const registerUser = async (req, res) => {
  try {
    // 1️⃣ Check if body exists
    
    const { fullName, password, userName, email } = req.body;
    
    console.log("f 
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerUser };
