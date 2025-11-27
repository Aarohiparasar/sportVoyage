import TripInquiry from "../Models/TripInquiry.js";

export const createTripInquiry = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, interestedIn } = req.body;

    if (!fullName || !email || !phoneNumber || !interestedIn) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newInquiry = await TripInquiry.create({
      fullName,
      email,
      phoneNumber,
      interestedIn,
    });

    return res.status(201).json({
      success: true,
      message: "Your sports trip plan request has been submitted!",
      data: newInquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
