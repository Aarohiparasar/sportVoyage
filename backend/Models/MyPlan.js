import mongoose from "mongoose";

const myPlanSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
}, { timestamps: true } );

export default mongoose.model("MyPlan", myPlanSchema);
