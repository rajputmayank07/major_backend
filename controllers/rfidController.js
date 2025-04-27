const User=require('../models/User');
exports.checkRFID= async (req,res)=>{
    try{
        const{rfid_tag}=req.body;
        const user =await User.findOne({rfid_tag});
        if(!user){
            return res.status(200).json({
                valid: false,
                message: 'User not found'
            });
        }
        if (user.meal_count > 0) {
            return res.status(200).json({
              valid: true,
              meal_count: user.meal_count
            });
        }else{
            return res.status(200).json({
              valid: false,
              message: 'Meal count is zero'
            });
        }

    }catch(error){
        console.error(error);
        return res.status(500).json({
        valid: false,
        error: 'Server error'
    });
    }
};

/*Assumed status codes are as follows
'11' => Thali dispensed
'10' => Thali not dispensed
'01' => Token dispensed
'00' => Token not dispensed
*/
exports.reportDispense = async (req, res) => {
    try {
      const { rfid_tag, statusCode } = req.body;
  
      const user = await User.findOne({ rfid_tag });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      
      if(statusCode === '11' || statusCode === '01') {
        if (user.meal_count > 0) {
          user.meal_count -= 1;
          await user.save();
        }
        return res.status(200).json({
          success: true,
          message: 'Meal count decremented',
          meal_count: user.meal_count
        });
      }else {
        return res.status(200).json({
          success: true,
          message: 'No meal dispensed, no update',
          meal_count: user.meal_count
        });
      }
      }catch(error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
};