import React from 'react';

function VideoComponent({id,small}) {
  return (
    <iframe 
    style={{marginLeft:20,marginRight:25,background:'grey',border:'1px solid grey'}}
    width = {small? "290":'95%'}
    height = {small? "160" : "600"}
    src={`https://www.youtube.com/embed/${id}`}
    title="Youtube Video Player"
    allowFullScreen
    
    ></iframe>
  )
}

export default VideoComponent
