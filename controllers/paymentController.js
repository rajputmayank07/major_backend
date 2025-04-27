require('dotenv').config();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// create order route
exports.createOrder = async (req, res) => {
  try {
    const { planType } = req.body;
    // planType can be 'single' => 60 Rs, or 'monthly' => 1500 Rs
    let amount = 0;
    if (planType === 'single') {
      amount = 60;
    } else if (planType === 'monthly') {
      amount = 1500;
    }

    // Razorpay expects amount in *paise*, so multiply by 100
    const orderOptions = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: 'receipt_order_74394'
    };

    const order = await razorpay.orders.create(orderOptions);
    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Something went wrong' });
  }
};
