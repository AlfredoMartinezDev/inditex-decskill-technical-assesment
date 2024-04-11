import { Link, useOutletContext, useParams } from "react-router-dom"
import { Episode, PodcastEpisodes } from "../interfaces"

const PodcastEpisode = () => {
	const params = useParams()

	const [singlePodcastData]: [PodcastEpisodes] = useOutletContext()


	const episode = singlePodcastData.results.find((result: Episode) => result.trackId === Number(params.episodeId))


	return (
		<div className="flex flex-col gap-2">
			<Link to=".." className="bg-[#384549] w-fit px-2 pb-1 pt-1.5 text-white rounded-md hover:bg-[#DEE4E8] hover:text-[#384549]">Come back</Link>
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
		</div>

	)
}

export default PodcastEpisode