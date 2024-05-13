import Location from "../models/locationSchema.js";

export const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.find({status : true});
        if (locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations", error);
        next(error);
    }
}

export const addLocation = async (req, res, next) => {
    try {
        const maxLocation = await Location.findOne({}, { location_no: 1 }).sort({ location_no: -1 });
        let maxLocationNo = 0;
        if (maxLocation) {
            maxLocationNo = maxLocation.location_no;
        }
        const location_no = maxLocationNo + 1;
        const { location_name, status } = req.body;
        const newLocation = new Location({
            location_no,
            location_name,
            status
        });
        await newLocation.save();
        res.status(201).json({ message: "Location added successfully" });
    } catch (error) {
        console.error("Error adding location", error);
        next(error);
    }
}

export const updateLocation = async (req, res, next) => {
    try {
        const { location_no, location_name, status } = req.body;
        const existingLocation = await Location.findOne({ location_no });
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        existingLocation.location_name = location_name;
        existingLocation.status = status;
        await existingLocation.save();
        res.status(200).json({ message: "Location updated successfully" });
    } catch (error) {
        console.error("Error updating location", error);
        next(error);
    }
}