import React, { useEffect, useState, useCallback } from 'react';

import { youtubeDownload } from 'api';
import { YoutubeStatus } from 'models';
import { API_SERVER } from 'config';
import YoutubeForm from './youtube-form';
import YoutubeDownloadStatus from './youtube-status';

let es: EventSource | null = null;

const YoutubePage: React.FC = () => {
  const [status, setStatus] = useState({
    stage: -1,
    progress: 0,
    eta: 0,
    error: null,
  } as YoutubeStatus);

  useEffect(() => {
    es = new EventSource(`${API_SERVER}/youtube`, { withCredentials: true });
    es.onmessage = (event) => {
      setStatus(JSON.parse(event.data));
    };

    return () => {
      es && es.close();
    };
  }, []);

  const onSubmit = useCallback((url: string, tags: string[]) => {
    youtubeDownload(url, tags);
  }, []);

  return (
    <div>
      <YoutubeForm onSubmit={onSubmit} />
      <YoutubeDownloadStatus {...status} />
    </div>
  );
};

export default YoutubePage;
