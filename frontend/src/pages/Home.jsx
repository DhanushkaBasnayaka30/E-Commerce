import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLatter from "../components/NewsLatter";
import OurPolicy from "../components/OurPolicy";
import { useInView } from "react-intersection-observer"; 
import Responsive from "../components/Responsive";
function Home() {
	const { ref: visionMissionRef, inView: visionMissionInView } = useInView({
		triggerOnce: false, // Trigger animation only once
		threshold: 0.1, // Trigger when 10% of the element is in the viewport
	});

	return (
		<div className="sm:pt-28 pt-16 -28 mt-1 px-3 md:p-0">
			<div className="border-2 h-screen " data-aos="zoom-in">
				{/* <Hero /> */}
				<Responsive deviceType="desktop" />

			</div>
			<div ref={visionMissionRef}
				className={`${
					visionMissionInView ? "" : ""
				}`}>
				<LatestCollection />
			</div>
			<div
				ref={visionMissionRef}
				className={`${
					visionMissionInView ? "animate-fade-up animate-ease" : ""
				}`}>
				<BestSeller />
			</div>
			<div className="bg-[#f5d5d5] py-20 h-auto flex justify-center items-center">
				<OurPolicy />
			</div>
			<div className="mt-20 ">
				<NewsLatter />
			</div>
		</div>
	);
}

export default Home;
