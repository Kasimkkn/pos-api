import KOTBook from '../models/KOTbookSchema.js';
import BillBook from '../models/billBookSchema.js';
import Bill from '../models/billSchema.js'
import ExistingCartItem from '../models/existingCartItemSchema.js';

export const createBill = async (req,res,next) =>{
    try {
        let  {billData} = req.body
        const latestKOTNo = await KOTBook.findOne({ status: true }, { KOT_book: 1 }).sort({
          KOT_book: -1,
        });
        let maxKOTNo = 0;
        if (latestKOTNo) {
          maxKOTNo = latestKOTNo.KOT_book;
        }
    
        const maxBillBookNo = await BillBook.findOne({}, { bill_book: 1 }).sort({
          bill_book: -1,
        });
        let maxBillBook = 0;
        if (maxBillBookNo) {
          maxBillBook = maxBillBookNo.bill_book;
        }
        const maxBill = await Bill.findOne({}, { bill_no: 1 }).sort({
          bill_no: -1,
        });
        let maxBillNo = 0;
        if (maxBill) {
          maxBillNo = maxBill.bill_no;
        }
        const newBillNo = maxBillNo + 1;
    
    
        if (billData.location_name !== "undefined") {
    
          switch (billData.location_name) {
            case "Common-Hall":
              billData.common = Number(billData.final_amount).toFixed(2);
              break;
            case "Rooms":
              billData.room = Number(billData.final_amount).toFixed(2);
              break;
            case "Ac-Hall":
              billData.ac = Number(billData.final_amount).toFixed(2);
              break;
            case "Banquet":
              billData.banquet = Number(billData.final_amount).toFixed(2);
              break;
            case "Parcel":
              billData.parcel = Number(billData.final_amount).toFixed(2);
              break;
            case "Swiggy":
              billData.swiggy = Number(billData.final_amount).toFixed(2);
              break;
            case "Zomato":
              billData.zomato = Number(billData.final_amount).toFixed(2);
              break;
            default:
              billData.common = Number(billData.final_amount).toFixed(2);
              break;
          }
        }
    
        billData.item_details = billData.itemDetails;
        billData.bill_book = maxBillBook;
        billData.KOT_book = maxKOTNo;
        billData.bill_no = newBillNo;
        billData.location_name = billData.location_name;
        billData.final_amount = Number(billData.final_amount).toFixed(2);
        billData.cgst_tax = Number(billData.cgst_tax);
        billData.sgst_tax = Number(billData.sgst_tax);
        billData.discount_reason = String(billData.discount_reason);
        billData.discount_perc = Number(billData.discount_perc);
        billData.pay_mode = "unpaid";
        billData.created_at = Date.now();
        const createBill =  await Bill.create(billData);
        try {
            await ExistingCartItem.deleteMany({
            table_no: billData.table_no,
            location_name: billData.location_name,
          });

          res.status(200).json({
            success:true,
            message:"bill created",
            createBill
        })
        } catch (error) {
          res.status(500).json({
              success: false,
              message: "Internal server error" + error
          })   
          next(error);
        }
      } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
      }
}

export const getBill = async (req,res,next) =>{
    try {
        const {bill_no} = req.body
        const bill = await Bill.findOne({bill_no})
        res.status(200).json(bill)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

export const getBills = async (req,res,next) =>{
    try {
        const bills = await Bill.find({})
        res.status(200).json(bills)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

