

export function fetchFromLaravel(csrf,method,endPoint,body,callback,validateErrorCallback){
    fetch(endPoint,{
        headers:{
            'Content-Type':"application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-Token": csrf
        },
        method: method,
        credentials: "same-origin",
        body: JSON.stringify(body)
    }).catch(error=>{
        location.reload();
    }).then(
        responseErrorSwitch.bind(null,validateErrorCallback)
    ).then(response=>{
        return response.json();
    }).then(response=>{
        callback(response);
    })
}

const responseErrorSwitch = async (validateErrorCallback,response) => {
    if(response.ok){
        return response;
    }

    switch(response.status){
        case 400: throw Error('INVALID_TOKEN');
        case 401: throw Error('UNAUTHORIZED');
        case 419: location.reload();    //csrf token miss match
        case 422:                       //validattion error
            if(!(validateErrorCallback)) return response;
            validateErrorCallback(await response.json());
            throw Error('VALIDATE_FAIL');
        case 500: throw Error('INTERNAL_SERVER_ERROR');
        case 502: throw Error('BAD_GATEWAY');
        case 404: throw Error('NOT_FOUND');
        default:  throw Error('UNHANDLED_ERROR');
    } 
}
