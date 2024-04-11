import { Outlet, useOutletContext, useParams } from "react-router-dom"
import useSinglePodcastQuery from "../hooks/useSinglePodcastQuery"
import { Podcast, PodcastsResponse } from "../interfaces"
import { useEffect } from "react"



const PodcastDetails = () => {
	const params = useParams()

	const [allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts, handleLoadingState]: [PodcastsResponse, boolean, Error, (state: boolean) => boolean] = useOutletContext()

	const { singlePodcastData, singlePodcastIsLoading, singlePodcastError } = useSinglePodcastQuery(params.podcastId);

	useEffect(() => {
		if (isLoadingAllpodcasts || singlePodcastIsLoading) {
			handleLoadingState(true)
		} else {
			handleLoadingState(false)
		}
	}, [handleLoadingState, isLoadingAllpodcasts, singlePodcastIsLoading])

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
					<div className="border rounded-lg border-[#A1B0B4] w-fit p-4 flex flex-col gap-4">
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
			<Outlet context={[singlePodcastData]} />
		</div>

	)
}

export default PodcastDetails