import { useQuery } from '@tanstack/react-query';
import { STALE_TIME_QUERIES, getSinglePodcast } from '../utils';

const useSinglePodcastQuery = (podcastId: string | undefined) => {

	const { data: singlePodcastData, isLoading: singlePodcastIsLoading, error: singlePodcastError } = useQuery({
		queryKey: [`Podcast-${podcastId}`],
		queryFn: () => getSinglePodcast(podcastId),
		staleTime: STALE_TIME_QUERIES,
	});

	return { singlePodcastData, singlePodcastIsLoading, singlePodcastError };
};

export default useSinglePodcastQuery;