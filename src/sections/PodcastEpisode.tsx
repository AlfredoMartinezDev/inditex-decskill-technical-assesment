import { useParams } from "react-router-dom"
import { Episode } from "../interfaces"
import useSinglePodcastQuery from "../hooks/useSinglePodcastQuery";

const PodcastEpisode = () => {
	const params = useParams()

	const { singlePodcastData } = useSinglePodcastQuery(params.podcastId);


	const episode = singlePodcastData?.results.find((result: Episode) => result.trackId === Number(params.episodeId))


	return (
		<div>
			{
				episode && (
					<div className="flex flex-col gap-4">
						<h2 className='text-3xl'>{episode.trackName}</h2>
						<div dangerouslySetInnerHTML={{ __html: episode.description }} />
						<div className="w-full">
							<audio src={episode.episodeUrl} controls className="w-full">
								Your browser does not support the <code>audio</code> element.
							</audio>
						</div>
					</div>
				)
			}

		</div>
	)
}

export default PodcastEpisode