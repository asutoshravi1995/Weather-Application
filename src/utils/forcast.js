const request=require('postman-request')

const forcast=(latitude,longitude,callback)=>{
    const my_token='f94ac1de3c3b7843cdf68a92d4dd5f94'
    const url='http://api.weatherstack.com/current?access_key='+my_token+'&query='+latitude+','+longitude+''
    request({url,json:true},(err,{body}={})=>{
        if(err){
            callback("unable to connect to forcast services!",undefined)
        }
        else if(body.error){
            callback("Unable to find forcast for requested location, Please try another",undefined)
        }
        else{
            let day;
            let check=body.current.is_day
            if(check=='yes'){
                day='Day'
            }
            else{
                day='Night'
            }
            callback(undefined,
                `Current Tempreture is ${body.current.temperature} and it feels like ${body.current.feelslike} and it will ${body.current.weather_descriptions[0]} all ${day}`
                )
        }
    })

}
module.exports=forcast