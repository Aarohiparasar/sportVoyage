import MyPlan from "../models/MyPlan.js";

export const addToPlan = async (req, res) => {
  try {
    const { packageId } = req.body;

    const newPlan = await MyPlan.create({ packageId });

    res.status(201).json({
      success: true,
      newPlan,
      message: "Package added to plan!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyPlan = async (req, res) => {
  try {
    const plans = await MyPlan.find()
      .populate("packageId")
      .lean();

    const formatted = plans.map((p) => ({
      _id: p._id,
      package: p.packageId,
    }));

    res.status(200).json({ success: true, plans: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
