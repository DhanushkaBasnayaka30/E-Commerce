import React from "react";

function NewsLatter() {
  const handleSubmit=(event)=>{
    event.preventDefault()
  }
	return (
		<>
			<div className="text-center justify-center w-full  flex flex-col">
				<p className="text-2xl font-medium text-gray-800">
					Subcirbe now & get 20% off
				</p>
        <p className="text-gray-400 mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat in autem ab eius incidunt dignissimos id! </p>
          <div className="w-full h-12 ">

          <form onSubmit={handleSubmit} className="w-full sm:w-3/4  mx-auto flex border  items-center my-6  ">
            <input required type="email" placeholder=" Enter You Email" className ="  outline-none  w-full h-full "name="" id="" />
            <button className="bg-black text-white text-xs px-20 py-4   ">SUBCRIBE</button>
          </form>
          </div>
         
			</div>
		</>
	);
}

export default NewsLatter;
