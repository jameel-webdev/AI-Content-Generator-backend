import Stripe from "stripe";
import { nextBillingDate, renewPlan } from "../utils/featureFunctions.js";
import { Payment } from "../models/payment.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res, next) => {
  try {
    const { amount, subscriptionPlan } = req.body;
    if (!amount || !subscriptionPlan) {
      throw new Error("Provide subcription details");
    }
    const user = req?.user;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    });
    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, error: error });
  }
};
