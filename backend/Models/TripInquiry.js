import mongoose from "mongoose";

const tripInquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    interestedIn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TripInquiry = mongoose.model("TripInquiry", tripInquirySchema);
export default TripInquiry;
