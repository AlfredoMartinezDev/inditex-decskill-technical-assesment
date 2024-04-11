import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Root from './sections/Root';
import PodcastDetails from './sections/PodcastDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PodcastEpisode from './sections/PodcastEpisode';
import Layout from './components/Layout';
import PodcastDetailsEpisodes from './sections/PodcastDetailsEpisodes';

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Root />} />
            <Route path='podcast/:podcastId' element={<PodcastDetails />}>
              <Route index element={<PodcastDetailsEpisodes />} />
              <Route path='episode/:episodeId' element={<PodcastEpisode />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
