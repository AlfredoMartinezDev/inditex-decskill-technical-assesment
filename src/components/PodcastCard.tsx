import { Link } from "react-router-dom"
import { Podcast } from "../interfaces"

const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
	return (
		<li key={podcast.id.label} className="bg-[#384549] min-w-80 min-h-96 rounded-lg">
			<Link to={`/podcast/${podcast.id.attributes["im:id"]}`} className="flex flex-col items-center gap-4 py-2">
				<div>
					<img src={podcast["im:image"][2].label} className="rounded-lg" />
				</div>
				<div className="max-w-60 text-center text-[#DEE4E8] font-serif">
					<p>{podcast?.title?.label}</p>
					<div className="bg-[#DEE4E8] w-full my-2 h-px" />
					<p>Author: {podcast["im:artist"].label}</p>
				</div>
			</Link>
		</li>
	)
}

export default PodcastCard