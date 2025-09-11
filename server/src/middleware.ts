import { NextFunction , Request , Response } from "express";
import { userModel } from "./db";
import jwt from "jsonwebtoken" ;
import "dotenv/config" ;

const JWT_SECRET:string = process.env.JWT_SECRET as string

export const Authentication = async (req: Request , res : Response , next : NextFunction) => {
  const token = req.headers.authorization ;
  if (!token){
    return res.status(401).json({
      message : "Authentication fails"
    })
  }
  const userid = jwt.verify(token , JWT_SECRET) ;
  const response = await userModel.findOne({
    email : userid
  })
  if (response){
    //@ts-ignore
    req.email = response.email;
    next() ;
  }
  else{
    return res.status(404).json({
      message : "Authentication fails"
    }) ;
  }
}