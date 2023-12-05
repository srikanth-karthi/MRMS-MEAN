 function responsehandle(res,statuscode,message,data)
{
    return res.status(statuscode).json(
    {
        "status":statuscode,
        "message":message,
        "data":data
}
    )
}
module.exports=responsehandle;