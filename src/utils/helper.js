export const hrToMin=(min)=>{
    const hr = Math.floor(min/60);
    const m = Math.floor(min%60);
    return `${hr}H ${m}M`;
}
export const ratingToPercentage=(rating)=>{
    return (rating*10)?.toFixed(0);
}
export const ratingColor=(rating)=>{
    if(rating>=7){
       return "green";
    }
    else if(rating>=5){
        return "yellow";
    }else{
        return "red";
    }
}