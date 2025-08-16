const User = require("../Model/UserModel");

// ✅ Insert User
const InsertUser = async (req, res) => {
  try {
    const data = req.body;

    // Generate next userId
    const lastUser = await User.findOne().sort({ createdAt: -1 }).exec();
    let nextUserId = "USER1";

    if (lastUser?.userId) {
      const lastUserNumber = parseInt(lastUser.userId.replace("USER", ""), 10) || 0;
      nextUserId = `USER${lastUserNumber + 1}`;
    }

    const user = new User({
      userId: nextUserId,
      role: data.role,
      name: data.name,
      email: data.email,
      password: data.password, // ⚠️ You may want to hash with bcrypt
      phone: data.phone,
      gender: data.gender,
      dob: data.dob ? new Date(data.dob) : null,
        line1: data?.line1,
        city: data?.city,
        district: data?.district,
        state: data?.state,
        country: data?.country,
        zip: data?.zip,
      IsStatus:data?.IsStatus,
      photo:data?.photo,
      gymId: data.gymId,
    });

    console.log(user,'userobj');
    

    const savedUser = await user.save();
    res.status(201).json({ message: "User inserted successfully", user: savedUser });

  } catch (error) {
    res.status(500).json({ message: "Error inserting user", error: error.message });
  }
};

// ✅ Update User
const EditUser = async (req, res) => {
  try {
    const userId = req.body.id;
    const data = req.body.obj;

    const result = await User.updateOne(
      { userId },
      { $set: data },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made to the user" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// ✅ Get User List
const GetUserList = async (req, res) => {
  try {
    const users = await User.find().populate("gymId").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user list", error: error.message });
  }
};

module.exports = { 
    InsertUser,
     EditUser, 
     GetUserList
 };
