import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLatter from "../components/NewsLatter";
import OurPolicy from "../components/OurPolicy";
import { useInView } from "react-intersection-observer"; 
function Home() {
	const { ref: visionMissionRef, inView: visionMissionInView } = useInView({
		triggerOnce: false, // Trigger animation only once
		threshold: 0.1, // Trigger when 10% of the element is in the viewport
	});

	return (
		<div className="sm:pt-28 pt-16 -28 mt-1 px-2">
			<div className=" " data-aos="zoom-in">
				<Hero />
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
			<div>
				<OurPolicy />
			</div>
			<div className="mt-4">
				<NewsLatter />
			</div>
		</div>
	);
}

export default Home;
