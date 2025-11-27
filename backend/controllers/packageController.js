import Package from "../Models/packageModel.js";

// Add a new package
export const addPackage = async (req, res) => {
  try {
    const packages = await Package.insertMany(req.body);
    res.status(201).json({ success: true, message: "Packages added", packages });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


// Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json({ success: true, packages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single package
export const getSinglePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.json({ success: true, pkg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
