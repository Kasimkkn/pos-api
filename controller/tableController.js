import LocationInfo from "../models/locationInfoSchema.js";
import Location from "../models/locationSchema.js";

export const getTables = async (req, res, next) => {
  try {
    const locations = await LocationInfo.find();
    if (locations.length === 0) {
      return res.status(404).json({ message: "No locations found" });
    }
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations", error);
    next(error);
  }
};

export const addTable = async (req, res, next) => {
  try {
    const { location_no, table_no } = req.body;

    const location = await Location.findOne({
      location_no,
    });
    const prefix = location.location_name.substring(0, 3).toUpperCase();
    const serial_no = `${prefix}${tableData.newTableNo}`;

    const table = await LocationInfo.create({
      serial_no,
      table_no,
      location_no,
      status: true,
    });

    res.status(200).json({ message: "Table added successfully", table });
  } catch (error) {
    console.error("Error adding table", error);
    next(error);
  }
};

export const updateTable = async (req, res, next) => {
  try {
    const { table_no, status } = req.body;
    const existingTable = await LocationInfo.findOne({ table_no });
    if (!existingTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    existingTable.status = status;
    await existingTable.save();
    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    console.error("Error updating table", error);
    next(error);
  }
}
