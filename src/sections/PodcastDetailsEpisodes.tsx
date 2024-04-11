import { Episode, PodcastEpisodes } from '../interfaces'
import { formatDate, formatMilliseconds } from '../utils'
import { Link, useOutletContext, useParams } from 'react-router-dom'

const PodcastDetailsEpisodes = () => {
	const params = useParams()
	const [singlePodcastData, singlePodcastIsLoading, singlePodcastError]: [PodcastEpisodes, boolean, Error] = useOutletContext()


	if (singlePodcastError) {
		throw new Error("There was an error loading this podcast")
	}

	if (singlePodcastIsLoading) {
		return <div />
	}

	const { results } = singlePodcastData

	return (
		<div>
			<div className='pb-4'>
				<h2 className='text-3xl'>Episodes: {results.length}</h2>
			</div>
			<div className='border border-[#A1B0B4] rounded-lg overflow-hidden'>
				<table className="w-full">
					<thead>
						<tr>
							<th className="bg-[#384549] text-white text-lg text-left p-2">
								Title
							</th>
							<th className="bg-[#384549] text-white text-lg text-left p-2">
								Date
							</th>
							<th className="bg-[#384549] text-white text-lg text-left p-2">
								Duration
							</th>
						</tr>
					</thead>
					<tbody>
						{
							results.slice(1, results.length).map((result: Episode, index) => {

								const releaseDate = formatDate(result.releaseDate)
								const trackTime = formatMilliseconds(result.trackTimeMillis)

								return (
									<tr key={result.trackId} className={index % 2 ? 'bg-gray-100' : ''}>
										<td className='p-2'>
											<Link to={`/podcast/${params.podcastId}/episode/${result.trackId}`} className="hover:text-[#737678]">{result.trackName}</Link>
										</td>
										<td className='p-2'>
											{releaseDate}
										</td>
										<td className='p-2'>
											{trackTime}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default PodcastDetailsEpisodes