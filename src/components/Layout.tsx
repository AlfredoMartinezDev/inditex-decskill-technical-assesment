

import { Link, Outlet } from "react-router-dom"
import useAllPodcastsQuery from "../hooks/useAllPodcastsQuery";
import { useCallback, useState } from "react";
import LoadingIcon from "./LoadingIcon";


const Layout = () => {
	const { allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts } = useAllPodcastsQuery();

	const [loadingState, setLoadingState] = useState<boolean>(false)

	const handleLoadingState = useCallback((state: boolean) => {
		setLoadingState(state)
	}, [])

	return (
		<div className="bg-[#DEE4E8] min-h-screen">
			<div className="container mx-auto">
				<header>
					<Link to="/">
						<div className="flex justify-between items-center">
							<h1 className="font-serif text-4xl py-2 hover:text-[#384549]">Podcastify</h1>
							{loadingState && <LoadingIcon />}
						</div>
						<div className="h-1 w-full bg-black" />
					</Link>
				</header>
				<Outlet context={[allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts, handleLoadingState]} />
			</div>
		</div>
	)
}

export default Layout