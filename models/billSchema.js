import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
     bill_book:{
         type:Number,
         required: true,
     },
     KOT_book:{
         type:Number,
         required: true,
     },
     bill_no:{
         type: Number,
         required: true,
         unique: true,
         default: 0
     },
     item_details:[{
        item_no:Number,
        item_name:String,
        item_image:String,
        price:Number,
        quantity:Number,
        total:Number
     }],
     fd:Number || 0.00,
     discount_reason:{
        type:String,
        default:""
     },
     cgst_tax:{
        type:Number,
        default:0.00
     },
     sgst_tax:{
        type:Number,
        default:0.00
     },
     vat_tax:{
        type:Number,
        default:0.00
     },
     total_tax:{
         type:Number,
         default:0.00
     },
     final_amount:{
        type:Number,
        default:0.00
     } ,
     common:{
        type:Number,
        default:0.00
     },
     ac:{
        type:Number,
        default:0.00
     },
     room:{
        type:Number,
        default:0.00
     },
     banquet:{
        type:Number,
        default:0.00
     },
     parcel:{
        type:Number,
        default:0.00
     },
     swiggy:{
        type:Number,
        default:0.00
     },
     zomato:{
        type:Number,
        default:0.00
     },
     table_no:{
        type:String,
        required: true
     },
     location_name:{
        type:String,
        required: true
     },
     created_at:{
        type: Date,
        default: Date.now()
     },
     cash_pay:{
        type:Boolean,
        default:false
     },
     card_pay:{
        type:Boolean,
        default:false
     },
     upi_pay:{
        type:Boolean,
        default:false
     },
     NEFT_pay:{
        type:Boolean,
        default:false
     },
     is_void_payment:{
        type:Boolean,
        default:false
     },
     void_reason:String || "",
     is_transferred:{
         type: Boolean,
         default: false
     },
     is_locked:{
         type: Boolean,
         default: false
     },
     customer_name:{
        type:String,
        default:""
     },
     customer_phone:{
        type:Number,
        default:0
     },
     ST_amount:{
        type:Number,
        default:0
     },
     GST_no:{
        type:String,
        default:""
     },
     discount_perc:{
        type:Number,
        default:0
     },
     round_off:{
        type:Number,
        default:0
     },
     pay_mode:{
        type:String,
        default:"CASH"
     }, 

})


billSchema.post("save", function (next) {
   if(this.item_details.length === 0){
      this.deleteOne();
   }
   if(this.final_amount === 0.00){
      this.deleteOne(); 
   }
})

const Bill = mongoose.model("Bill", billSchema);

export default Bill