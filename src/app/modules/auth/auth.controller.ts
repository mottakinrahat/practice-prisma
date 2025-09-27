import { Request, Response } from "express";
import { catchAsync } from "../../../helpers/trycatch";

import { sendResponse } from "../../../helpers/sendResponse";
import status from "http-status";
import { authServices } from "./auth.service";


const loginUser=catchAsync(async(req:Request,res:Response)=>{
    const result=await authServices.loginUser(req.body)
    const {refreshToken}=result;
    res.cookie("refreshToken",refreshToken,{
        secure: true,
        httpOnly: true,
    })
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"user logged in successfully",
        data:{
            accessToken:result.accessToken,
            needPasswordChange:result.needPasswordChange,
            
        }
    })
})
const refreshToken=catchAsync(async(req:Request,res:Response)=>{
    const{refreshToken}=req.cookies;
    console.log(refreshToken)
    const result=await authServices.refreshToken(refreshToken)
    
    sendResponse(res,{
        statusCode:status.OK,
        success:true,
        message:"user logged in successfully",
        data:result
        // data:{
        //     accessToken:result.accessToken,
        //     needPasswordChange:result.needPasswordChange,
            
        // }
    })
})

export const authController={
    loginUser,
    refreshToken
}