import mongoose from "mongoose";

const userRightsSchema = new mongoose.Schema({

  user_no:Number,
  first_name: String,
  bill_book: Boolean,
  KOT_book: Boolean,
  bill_handle: Boolean,
  set_bills: Boolean,
  payroll: Boolean,
  expenditure: Boolean,
  item_wise_report: Boolean,
  payment_wise: Boolean,
  location_wise_monhly: Boolean,
 daily_sales: Boolean,
  monthly_sales: Boolean,
  stock: Boolean,
  transferred_detais: Boolean,
  vendor_purchase: Boolean,
  stock_management: Boolean,
});

const UserRights = mongoose.model("UserRights", userRightsSchema);
export default UserRights;
