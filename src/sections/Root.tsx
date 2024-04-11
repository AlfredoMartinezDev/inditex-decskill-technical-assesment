import { Link } from "react-router-dom";
import useAllPodcastsQuery from "../hooks/useAllPodcastsQuery";

const Root = () => {
	const { allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts } = useAllPodcastsQuery();

	if (isErrorAllPodcasts) {
		throw new Error("There was an error loading all podcasts")
	}

	if (isLoadingAllpodcasts) {
		return <div className="h-screen" />
	}

	return (
		<div>
			<h1 className="font-serif text-4xl">Technical Assesment Inditex</h1>
			<p>Test sans serif</p>
			<ul>
				{
					allPodcastsData?.feed?.entry?.map(podcast => {
						return (
							<li key={podcast.id.label} >
								<Link to={`/podcast/${podcast.id.attributes["im:id"]}`}>
									<div>
										<img src={podcast["im:image"][2].label} />
									</div>
									<div className="font-serif">
										<p>{podcast?.title?.label}</p>
										<div className="bg-black w-full my-2 h-px" />
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