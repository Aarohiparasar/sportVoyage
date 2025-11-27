import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SeedPackagesPage = () => {
  const [packagesJSON, setPackagesJSON] = useState("");

  const handleInsertPackages = async () => {
    try {
      const packagesArray = JSON.parse(packagesJSON);
      const response = await axios.post("http://localhost:5009/api/packages/addPackages", packagesArray);
      if (response.data.success) {
        toast.success(`${response.data.packages.length} packages inserted successfully!`);
        setPackagesJSON(""); // clear input
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to insert packages. Make sure your JSON is valid.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold mb-6">Insert Packages into MongoDB</h1>
      
      <textarea
        className="w-full max-w-3xl h-96 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4"
        placeholder="Paste your array of package objects here..."
        value={packagesJSON}
        onChange={(e) => setPackagesJSON(e.target.value)}
      ></textarea>
      
      <button
        onClick={handleInsertPackages}
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition"
      >
        Insert Packages
      </button>
      
      <p className="mt-4 text-gray-500 max-w-3xl text-sm">
        ⚠️ Make sure your input is a valid JSON array of objects matching your Mongoose schema.
      </p>
    </div>
  );
};

export default SeedPackagesPage;
