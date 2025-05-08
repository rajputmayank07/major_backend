const User= require("../models/User");

exports.purchase = async (req, res) => {
    try {
      const userId = req.user.userId; // we get userId from the JWT payload
      const { planType } = req.body;
  
      let additionalMeals = 0;
      if (planType === 'single') {
        additionalMeals = 1;
      } else if (planType === 'monthly') {
        additionalMeals = 30;
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      user.meal_count += additionalMeals;
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: 'Subscription updated',
        meal_count: user.meal_count
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  };
  
exports.getMealCount = async (req, res) => {
    try {
      const { userId } = req.query;  // from the query param
      if (!userId) {
        return res.status(400).json({ success: false, message: 'userId is required' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, meal_count: user.meal_count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  };