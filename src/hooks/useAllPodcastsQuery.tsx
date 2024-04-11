import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { STALE_TIME_QUERIES, getAllPodcasts } from '../utils';
import { PodcastsResponse } from '../interfaces';

const useAllPodcastsQuery = () => {

	const { data: allPodcastsData, isLoading: isLoadingAllpodcasts, error: isErrorAllPodcasts }: UseQueryResult<PodcastsResponse, Error> = useQuery({
		queryKey: ['allPodcasts'],
		queryFn: getAllPodcasts,
		staleTime: STALE_TIME_QUERIES,
	});

	return { allPodcastsData, isLoadingAllpodcasts, isErrorAllPodcasts };
};

export default useAllPodcastsQuery;