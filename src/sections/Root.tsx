import { Link, useOutletContext } from "react-router-dom";
import { PodcastsResponse } from "../interfaces";
import { useEffect } from "react";


const Root = () => {
	const [allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts, handleLoadingState]: [PodcastsResponse, boolean, Error, (state: boolean) => boolean] = useOutletContext()

	useEffect(() => {
		if (isLoadingAllpodcasts) {
			handleLoadingState(true)
		} else {
			handleLoadingState(false)
		}
	}, [handleLoadingState, isLoadingAllpodcasts])

	if (isErrorAllPodcasts) {
		throw new Error("There was an error loading all podcasts")
	}

	if (isLoadingAllpodcasts) {
		return <div className="h-screen" />
	}

	return (
		<div>
			<ul className="flex flex-wrap gap-4 py-4">
				{
					allPodcastsData?.feed?.entry?.map(podcast => {
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
					})
				}
			</ul>
		</div>
	)
}

export default Root

