export interface Podcast {
  "im:name": {
    label: string;
  };
  "im:image": {
    label: string;
    attributes: {
      height: string;
    };
  }[];
  "summary": {
    label: string;
  };
  "im:price": {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  "im:contentType": {
    attributes: {
      term: string;
      label: string;
    };
  };
  "rights": {
    label: string;
  };
  "title": {
    label: string;
  };
  "link": {
    attributes: {
      rel: string;
      type: string;
      href: string;
    };
  };
  "id": {
    label: string;
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": {
    label: string;
    attributes: {
      href: string;
    };
  };
  "category": {
    attributes: {
      "im:id": string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  "im:releaseDate": {
    label: string;
    attributes: {
      label: string;
    };
  };
}

export interface PodcastsResponse {
	feed: {
		author: {
			name: {
				label: string
			},
			uri: {
				label: string
			}
		},
		entry: Podcast[],
		icon: {
			label: string
		},
		id: {
			label: string
		},
		link: [
			{
				attributes: {
					rel: string,
					type: string,
					href: string
				}
			}, {
				attributes: {
					href: string,
					rel: string
				}
			}
		],
		rights: {
			label: string
		},
		title: {
			label: string
		},
		updated: {
			label: string
		}
	}
}

export interface Episode {
    "artworkUrl160": string,
    "feedUrl": string,
    "closedCaptioning": string,
    "collectionId": number,
    "collectionName": string,
    "artistIds": Array<string> | null,
    "genres": [
        {
            "name": string,
            "id": string
        }
    ],
    "episodeGuid": string,
    "description": string,
    "shortDescription": string | null,
    "releaseDate": string,
    "trackId": number,
    "trackName": string,
    "country": string,
    "episodeFileExtension": string,
    "episodeContentType": string,
    "artworkUrl600": string,
    "artworkUrl60": string,
    "contentAdvisoryRating": string,
    "trackViewUrl": string,
    "episodeUrl": string,
    "collectionViewUrl": string,
    "trackTimeMillis": string,
    "previewUrl": string,
    "kind": string,
    "wrapperType": string
}

export interface PodcastEpisodes {
  resultCount: number,
  results: Array<Episode>
}