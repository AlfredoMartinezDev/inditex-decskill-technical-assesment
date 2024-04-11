import { Link, useOutletContext } from "react-router-dom";
import { PodcastsResponse } from "../interfaces";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { filterData } from "../utils";


const Root = () => {
	const [allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts, handleLoadingState]: [PodcastsResponse, boolean, Error, (state: boolean) => boolean] = useOutletContext()

	const [filter, setFilter] = useState('')

	useEffect(() => {
		if (isLoadingAllpodcasts) {
			handleLoadingState(true)
		} else {
			handleLoadingState(false)
		}
	}, [handleLoadingState, isLoadingAllpodcasts])

	const filteredData = useMemo(() => {
		if (allPodcastsData?.feed?.entry) {
			return filterData(allPodcastsData.feed.entry, filter, ['title', 'im:artist']);
		} else {
			return [];
		}
	}, [allPodcastsData, filter])

	if (isErrorAllPodcasts) {
		throw new Error("There was an error loading all podcasts")
	}

	if (isLoadingAllpodcasts) {
		return <div className="h-screen" />
	}

	const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value)
	}

	return (

		<div>
			<div className="py-2 flex justify-end gap-4">
				<div className="text-[#384549] text-2xl font-serif">{filteredData.length}</div>
				<input type="text" value={filter} onChange={handleFilter} placeholder="Filter podcasts" className="block w-56 border rounded-lg pl-2" />
			</div>
			<ul className="flex flex-wrap gap-4 py-4">
				{
					filteredData.map(podcast => {
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

