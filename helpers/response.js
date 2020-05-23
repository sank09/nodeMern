
const response_proto={
    success:true,
    error:[],
    data:[],
    message:""
}


const responseObject=(status,message,error=[],data={})=>{

    return {
        success:status,
        error:[...error],
        data:{...data},
        message:message
    }
}

module.exports={
    response_proto,
    responseObject
}