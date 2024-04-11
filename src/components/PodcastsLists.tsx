import { Podcast } from "../interfaces"
import PodcastCard from "./PodcastCard"



const PodcastsLists = ({ podcasts }: { podcasts: Podcast[] }) => {
	return (
		<ul className="flex justify-center md:justify-start flex-wrap gap-4 py-4">
			{
				podcasts.map(podcast => {
					return (
						<PodcastCard key={podcast.id.label} podcast={podcast} />
					)
				})
			}
		</ul>
	)
}

export default PodcastsLists