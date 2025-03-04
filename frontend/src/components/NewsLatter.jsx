import React from "react";

function NewsLatter() {
  const handleSubmit=(event)=>{
    event.preventDefault()
  }
	return (
		<>
			<div className="text-center justify-center w-full  flex flex-col ">
				<p className="text-2xl font-medium text-gray-800">
					Subcirbe now & get 20% off
				</p>
        <p className="text-gray-400 mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat in autem ab eius incidunt dignissimos id! </p>
          <div className="w-full md:w-[70%] mx-auto h-12 px-2 mt-8">

          <form onSubmit={handleSubmit} className=" w-full  sm:w-3/4  mx-auto flex border  items-center my-6  ">
            <input required type="email" placeholder=" Enter You Email" className ="pl-1 w-3/4 border h-[48px] border-gray-300 outline-none  md:w-full  "name="" id="" />
            <button className="bg-gray-400 text-gray-900 md:text-base  text-xs  h-12  hover:bg-black hover:text-white w-1/4 text-center ">SUBCRIBE</button>
          </form>
          </div>
         
			</div>
		</>
	);
}

export default NewsLatter;
