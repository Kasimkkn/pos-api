import Bill from "../models/billSchema.js"

export const getDailySales = async (req, res, next) => {
    try {
        const { todayDate } = req.body
        if (!todayDate) {
            return res.status(400).json({ message: "Please provide today's date" })
        }

        const selectedDate = new Date(todayDate);
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
        const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59, 999);

        const data = await Bill.find({
            created_at: {
                $gte: startDate,
                $lte: endDate,
            },
            item_details: { $exists: true, $ne: [] },
            final_amount: { $gt: 0 }
        }).select("-item_details");

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error,
        })
        next(error)
    }
}

export const getMonthlySales = async (req, res, next) => {
    try {
        const { fromDate, toDate } = req.body
        if (!fromDate || !toDate) {
            return res.status(400).json({ message: "Please provide from and to date" })
        }
        const selectedStartDate = new Date(fromDate);
        const selectedEndDate = new Date(toDate);
        const startDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate(), 0, 0, 0);
        const endDate = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate(), 23, 59, 59, 999);
        const data = await Bill.find({
          created_at: {
            $gte: startDate,
            $lte: endDate,
          },
          item_details: { $exists: true, $ne: [] },
          final_amount: { $gt: 0 }
        }).select("-item_details");

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error,

        })
        next(error)
    }

}

export const getTableWiseSales = async (req, res, next) => {
    try {
        const { fromDate, toDate } = req.body
        if (!fromDate || !toDate) {
            return res.status(400).json({ message: "Please provide from and to date" })
        }
        const selectedStartDate = new Date(fromDate);
        const selectedEndDate = new Date(toDate);
        const startDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate(), 0, 0, 0);
        const endDate = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate(), 23, 59, 59, 999);

        const aggregationPipeline = [
            {
                $match: {
                    "created_at": {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$table_no",
                    count: { $sum: 1 },
                    total_final_amount: { $sum: "$final_amount" }
                }
            }
        ];

        const data = await Bill.aggregate(aggregationPipeline);
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        next(error)
    }
}

export const getItemWiseSales = async (req, res, next) => {
    try {
        const { datesByInput } = req.body
        if (!datesByInput) {
            return res.status(400).json({ message: "Please provide date" })
        }
        const selectedDate = new Date(datesByInput);
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0);
        const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59, 999);
        const aggregationPipeline = [
            {
                $match: {
                    "created_at": {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $unwind: "$item_details"
            },
            {
                $group: {
                    _id: "$item_details.item_name",
                    totalQuantity: { $sum: "$item_details.quantity" },
                    totalPrice: { $sum: "$item_details.price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    item_name: "$_id",
                    quantity: "$totalQuantity",
                    total: "$totalPrice",
                }
            }
        ]
        const data = await Bill.aggregate(aggregationPipeline);
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        next(error)
    }
}

export const getItemWiseMonthlySales = async (req, res, next) => {
    try {
        const { fromDate, toDate } = req.body
        if (!fromDate || !toDate) {
            return res.status(400).json({ message: "Please provide from and to date" })
        }
        const selectedStartDate = new Date(fromDate);
        const selectedEndDate = new Date(toDate);
        const startDate = new Date(selectedStartDate.getFullYear(), selectedStartDate.getMonth(), selectedStartDate.getDate(), 0, 0, 0);
        const endDate = new Date(selectedEndDate.getFullYear(), selectedEndDate.getMonth(), selectedEndDate.getDate(), 23, 59, 59, 999);
        const aggregationPipeline = [
            {
                $match: {
                    "created_at": {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $unwind: "$item_details"
            },
            {
                $group: {
                    _id: "$item_details.item_name",
                    totalQuantity: { $sum: "$item_details.quantity" },
                    totalPrice: { $sum: "$item_details.price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    item_name: "$_id",
                    quantity: "$totalQuantity",
                    total: "$totalPrice",
                }
            }
        ]
        const data = await Bill.aggregate(aggregationPipeline);
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        next(error)
    }
}