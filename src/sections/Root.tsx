import { useOutletContext } from "react-router-dom";
import { PodcastsResponse } from "../interfaces";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { filterData } from "../utils";
import PodcastsLists from "../components/PodcastsLists";


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
			<div className="py-2 flex justify-center md:justify-end gap-4">
				<div className="text-[#384549] text-2xl font-serif">{filteredData.length}</div>
				<input type="text" value={filter} onChange={handleFilter} placeholder="Filter podcasts" className="block w-56 border rounded-lg pl-2" />
			</div>
			<PodcastsLists podcasts={filteredData} />
		</div>
	)
}

export default Root

