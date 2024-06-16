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