import React, { useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLatter from "../components/NewsLatter";
import { useInView } from "react-intersection-observer"; 
function About() {

  const { ref: visionMissionRef, inView: visionMissionInView } = useInView({
		triggerOnce: false, // Trigger animation only once
		threshold: 0.1, // Trigger when 10% of the element is in the viewport
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div  ref={visionMissionRef}
    className={` w-full h-auto  mt-8 sm:mt-20  p-1${
      visionMissionInView ? "transition-all duration-500  animate-fade-down animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out animate-normal" : ""
    }`}>
			<div>
				<h1 className="w-full h-20  text-2xl sm:text-base md:text-3xl sm:pt-16 text-center flex items-center justify-center ">
					<Title text1={"ABOUT"} text2={"US"} />
				</h1>
				{/* main */}
				<div className=" w-full h-auto flex flex-col md:flex-row md:mt-12 md:gap-x-4 items-start justify-center">
					{/* image */}
					<div className=" w-full h-[350px] md:h-[500px] ">
						<img
							src={assets.about_img}
							className="w-full h-full bg-center object-cover"
							alt=""
						/>
					</div>
					{/* description */}
					<div className=" w-full   flex flex-col justify-start items-center  p-2  md:h-[500px]">
						<div className="w-full h-auto flex flex-col text-justify gap-y-4 text-base ">
							<p className="text-xs md:text-sm sm:text-sm lg:text-lg ">
								Forever was born out of a passion for innovation and a desire to
								revolutionize the way people shop online. Our journey began with
								a simple idea: to provide a platform where customers can easily
								discover, explore, and purchase a wide range of products from
								the comfort of their homes.
							</p>
							<p className="text-sm lg:text-base">
								Since our inception, we've worked tirelessly to curate a diverse
								selection of high-quality products that cater to every taste and
								preference. From fashion and beauty to electronics and home
								essentials, we offer an extensive collection sourced from
								trusted brands and suppliers.
							</p>
						</div>
						{/* mision */}
						<div className=" mt-4 w-full text-justify flex flex-col gap-y-2 md:mt-8">
							<p className="lg:text-lg  text-base font-semibold">OUR MISION</p>
							<p className="text-sm lg:text-base">
								Our mission at Forever is to empower customers with choice,
								convenience, and confidence. We're dedicated to providing a
								seamless shopping experience that exceeds expectations, from
								browsing and ordering to delivery and beyond.
							</p>
						</div>
					</div>
				</div>
				<div className="w-full  h-auto gap-y-4 flex flex-col mt-8   items-start justify-center">
					<div className="w-full flex mt-4 text-2xl md:ml-12 ml-2">
						<Title text1={"WHY"} text2={"CHOOSE US"}></Title>
					</div>

					<div className="w-full flex-col md:grid-cols-3 md:grid flex md:w-[80%] md:mx-auto md:mt-12 text-sm lg:text-base md:gap-x-8 md:py-4 gap-6">
						<div className="w-[95%]   h-auto  rounded-md flex flex-col mx-auto hover:shadow-md hover:text-black text-gray-700  hover:shadow-gray-400 shadow-gray-300 shadow justify-around pb-4 ">
							<h1 className="w-full text-left p-2  font-semibold">
								Quality Assurance:
							</h1>
							<h1 className="w-full  p-2 text-center text-sm md:text-sm lg:text-base">
								We meticulously select and vet each product to ensure it meets
								our stringent quality standards.
							</h1>
						</div>
						<div className="w-[95%]   h-auto  rounded-md flex flex-col mx-auto hover:shadow-md hover:text-black text-gray-700  hover:shadow-gray-400 shadow-gray-300 shadow justify-around pb-4 ">
							<h1 className="w-full text-left p-2  font-semibold">
								Convenience:
							</h1>
							<h1 className="w-full p-2 text-center text-sm lg:text-base">
								With our user-friendly interface and hassle-free ordering
								process, shopping has never been easier.
							</h1>
						</div>
						<div className="w-[95%]  h-auto  rounded-md flex flex-col mx-auto hover:shadow-md hover:text-black text-gray-700 hover:shadow-gray-400 shadow-gray-300 shadow justify-around pb-4">
							<h1 className="w-full text-left p-2  font-semibold">
								Exceptional Customer Service:
							</h1>
							<h1 className="w-full p-2 text-center text-sm lg:text-base">
								Our team of dedicated professionals is here to assist you the
								way, ensuring your satisfaction is our top priority.
							</h1>
						</div>
					</div>
				</div>
				{/* subcription */}
				<div className="w-full  h-auto md:mt-16 mt-8">
					<NewsLatter />
				</div>
			</div>
		</div>
	);
}

export default About;
