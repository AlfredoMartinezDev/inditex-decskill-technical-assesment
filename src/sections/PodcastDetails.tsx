import { Link, useParams } from "react-router-dom"
import useSinglePodcastQuery from "../hooks/useSinglePodcastQuery"
import { Episode, Podcast } from "../interfaces"
import useAllPodcastsQuery from "../hooks/useAllPodcastsQuery"
import { formatDate, formatMilliseconds } from "../utils"



const PodcastDetails = () => {
	const params = useParams()

	const { allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts } = useAllPodcastsQuery();

	const { singlePodcastData, singlePodcastIsLoading, singlePodcastError } = useSinglePodcastQuery(params.podcastId);


	if (isErrorAllPodcasts) {
		throw new Error("There was an error loading all podcast")
	}

	if (singlePodcastError) {
		throw new Error("There was an error loading this podcast")
	}

	if (isLoadingAllpodcasts || singlePodcastIsLoading) {
		return <div />
	}


	const podcastGeneralInfo = allPodcastsData?.feed?.entry?.find((podcast: Podcast) => podcast.id.attributes["im:id"] === params.podcastId)

	return (
		<div className="grid grid-cols-2 py-4">
			{
				podcastGeneralInfo && (
					<div className="">
						<div>
							<img className="rounded-lg" src={podcastGeneralInfo['im:image'][2].label} height={170} width={170} />
						</div>
						<div className="max-w-80">
							<h2>{podcastGeneralInfo.title.label}</h2>
							<h3>By {podcastGeneralInfo['im:artist'].label}</h3>
						</div>
						<div className="max-w-80">
							<p>Description:</p>

							<div
								dangerouslySetInnerHTML={{ __html: podcastGeneralInfo.summary.label }}
							/>


						</div>
					</div>
				)
			}
			<div>
				<div className='pb-4'>
					<h2 className='text-3xl'>Episodes: {singlePodcastData?.results?.length}</h2>
				</div>
				<div className='border rounded-lg overflow-hidden'>
					<table className="w-full">
						<thead>
							<tr>
								<th className="text-lg text-left p-2">
									Title
								</th>
								<th className="text-lg text-left p-2">
									Date
								</th>
								<th className="text-lg text-left p-2">
									Duration
								</th>
							</tr>
						</thead>
						<tbody>
							{
								singlePodcastData?.results.slice(1, singlePodcastData?.results.length).map((result: Episode, index) => {

									const releaseDate = formatDate(result.releaseDate)
									const trackTime = formatMilliseconds(result.trackTimeMillis)

									return (
										<tr key={result.trackId} className={index % 2 ? 'bg-gray-100' : ''}>
											<td className='p-2'>
												<Link to={`/podcast/${params.podcastId}/episode/${result.trackId}`}>{result.trackName}</Link>
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
		</div>

	)
}

export default PodcastDetails