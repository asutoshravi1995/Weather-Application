const request=require('postman-request')

const geocode=(location,callback)=>{
    let my_access_token="pk.eyJ1IjoicmF2aTc1NDUiLCJhIjoiY2t5Y243c2xmMG9xMTJwcW9pdXl2a2NmciJ9.80msa70y7WqT7rTR9XtnPg"
    let url=`https://api.mapbox.com/geocoding/v5/mapbox.places/`+encodeURIComponent(location)+`.json?access_token=${my_access_token}&limit=1`
    request({url,json:true},(err,{body}={})=>{
        if(err){
            callback("Unable to connect to Location Services!",undefined)
        }
        else if(body.features.length===0){
            callback("Unable to find Location, Please try another!",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;


//for testing purpose

// geocode("New ?Delhi",(err,data)=>{
//     console.log("error -> "+err);
//     console.log("Data -> ",data);
// })