import React, { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false)
  const fetchImages = async () => {
    setLoading(true);
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.children;
    console.log(data);
    const list = data
      .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list)
    setLoading(false);
    console.log(images); 
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const tid=setInterval(()=>{
      handleClick('right');
    },3000)
  
    return () => {
      clearInterval(tid);
    }
  }, [index])
  

  const handleClick=(dir)=>{
    // console.log("curr index",index);
    const lastIdx=images.length-1;
    if(dir==='left'){
      if(index==0){
        console.log('last idx',lastIdx);
        setIndex(lastIdx);
      }
      else{
        setIndex(prev=>prev-1);
      }
    }
    else if(dir=='right'){
      if(lastIdx===index){
        console.log('last idx',lastIdx);
        setIndex(0);
      }
      else{
        setIndex(prev=>prev+1);
      }
    }
  }

  return (
    <div className="flex items-center">
      {loading ? (<div>Loading...</div>) :
      (
      <>
      <button onClick={()=>handleClick("left")} className="absolute w-[40px] h-[40px] text-2xl font-bold cursor-pointer bg-white">{"<"}</button>
      <img className="w-[100%] h-[100vh] object-cover" src={images[index]} alt="not found" />
      <button onClick={()=>handleClick("right")} className="absolute right-0 w-[40px] h-[40px] text-2xl font-bold cursor-pointer bg-white">{">"}</button>
      </>
      )
      }
    </div>
  );
};

export default App;
