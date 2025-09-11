import mongoose, { model, Schema } from "mongoose"; 
import { email, number } from "zod";

const userSchema = new Schema ({
  name : {type : String , require : true} ,
  email : {type : String , unique : true , require : true} ,
  password : {type : String , require : true} ,
  avatar : {type : String , require : true}
})

const counselorSchema = new Schema ({
  name : {type : String , require : true} ,
  email : {type : String , require : true , unique : true} ,
  password : {type : String , require : true} ,
  clinicName : {type : String , require : true} ,
  street : {type : String , require : true} ,
  city : {type : String , require : true} ,
  pincode : {type : Number , require : true} ,
  videocallsessionfee : {type : Number , require : true} ,
  offlinesessionfee : {type : Number , require : true}
})

const resourseSchema = new Schema ({
  stricle : [{type : String}]
})


export const userModel = model("user" , userSchema) ;
export const counselorModel = model("counselor" , counselorSchema) ;
