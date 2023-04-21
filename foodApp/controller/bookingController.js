let SK = "sk_test_51MytApSHyxDlyTGPrb5jaDVq8B5CH4M8qNhdPT01OCZSGMzOBLE7E8mYCUrVp52oO04RdomGhsXnHeLpKBTVOloJ00JABAPJyV";
const stripe = require('stripe')(SK);

const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

module.exports.createSession = async function (req, res) {
  try {
      // let userId = req.id;
      // let planId = req.params.id;

      // const user = await userModel.findById(userId);
      // const plan = await planModel.findById(planId);

      const session = await stripe.checkout.sessions.create({
      //   payment_method_type: ["card"],
      //   customer_email: user.email,
      //   client_reference_id: plan.id,
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          //   name: plan.name,
            name: "HealthyFood101",
          //   description: plan.description,
          //   description: "get yourself in shape",
          //   price: plan.price * 100,
            amount:"1234",
            currency: "inr",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/profile`,
        cancel_url: `${req.protocol}://${req.get("host")}/profile`,
      });
      // res.json({
      //     msg: "success",
      //     session
      // });
      res.redirect(303, session.url);
  }
  catch (err) {
      res.json({
          err:err.message
      })
  }
}