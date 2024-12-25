const gymModel= require('../Model/gymModel')


const InsertGym = async (req, res) => {
    try {
      const data = req.body;
  
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date(subscriptionStartDate);
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
  
      const lastGym = await Gym.findOne().sort({ createdAt: -1 }).exec();
  
      let nextGymId = "GYM1";
      if (lastGym && lastGym.gymId) {
        const lastGymNumber = parseInt(lastGym.gymId.replace("GYM", ""));
        nextGymId = `GYM${lastGymNumber + 1}`;
      }
  
      const gym = new gymModel({
        gymId: nextGymId,
        name: data.name,
        ownerEmail: data.ownerEmail,
        subscriptionStatus: "trial", 
        subscriptionStartDate: subscriptionStartDate,
        subscriptionEndDate: subscriptionEndDate,
        daysLeft: 30,
        isTrial: true, 
        address: data.address,
        logo: data.logo,
        phone: data.phone,
        website: data.website,
      });
  
      await gym.save();
  
      res.status(201).json({ message: "Gym inserted successfully", gym });
    } catch (error) {
      res.status(500).json({ message: "Error inserting gym", error: error.message });
    }
  };
  

  const EditGym = async (req, res) => {
    try {
      const body = req.body; 
      const { gymId } = body.id
      const { data } = body.obj

  
      const result = await Gym.updateOne(
        { gymId }, 
        { $set: data }, 
        { runValidators: true } 
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Gym not found" });
      }
  
      if (result.modifiedCount === 0) {
        return res.status(200).json({ message: "No changes made to the gym" });
      }
  
      res.status(200).json({ message: "Gym updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating gym", error: error.message });
    }
  };
  


  module.exports={
    InsertGym,
    EditGym
  }

