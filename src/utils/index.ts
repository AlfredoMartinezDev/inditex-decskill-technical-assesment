import { Podcast, PodcastsResponse } from "../interfaces"

const skipCorsUrl = "https://api.allorigins.win/raw?url="
const allPodscastsUrl = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

export const STALE_TIME_QUERIES = 1000 * 60 * 60 * 24

export const getAllPodcasts = async () => {
	const response = await fetch(`${skipCorsUrl}${encodeURIComponent(allPodscastsUrl)}`)
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
	const jsonData = await response.json()
	return jsonData as PodcastsResponse
}

export const getSinglePodcast = async (podcastId:string|undefined) => {
			const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
			const response = await fetch(`${skipCorsUrl}${encodeURIComponent(url)}`)
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const jsonData = await response.json()
			return jsonData as Podcast
		}

export const formatDate = (releaseDate:string) => {
	const date = new Date(releaseDate);
	const day = date.getUTCDate();
	const month = date.getUTCMonth() + 1;
	const year = date.getUTCFullYear();
	const formattedDate = `${day}/${month}/${year}`;
	return formattedDate
}

export const formatMilliseconds = (milliseconds:string) => {

		const millisecondsToNumber = Number(milliseconds)

    let totalSeconds = Math.floor(millisecondsToNumber / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    return formattedTime;
}