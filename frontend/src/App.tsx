import { useState, useEffect } from 'react';
import './App.css';
import Box from './components/Box';

type Result = {
  id: string,
  cover: string,
  title: string,
}

function App() {
  const [videoInput, setVideoInput] = useState<string>("");
  const [downloadableByURL, setDownloadableByURL] = useState<boolean>(false);
  const [downloadResponse, setDownloadResponse] = useState<boolean>(false);
  const [searchButton, setSearchButton] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleInput(videoInput);
  }, [videoInput])

  async function downloadByURL (url: string) {
    setDownloadResponse(false);
    const parts = url.split("v=");
    const viewkey = parts[1];

    const request = await fetch(`http://127.0.0.1:8000/process_url/${viewkey}/`);
    const response = request.json(); 
    response.then(result => setDownloadResponse(result['status']));
  }

  function handleInput(input: string) {
    if (input !== "" && input.includes('https')) {
      setDownloadableByURL(true);
      setSearchButton(false);
    }
    else if (input !== "" && !input.includes('https')) {
      setDownloadableByURL(false);
      setSearchButton(true);
    }
    else {
      setSearchButton(false);
      setSearchResults([]);
    }
  }

  async function getResults() {
    setIsLoading(true);
    const request = await fetch(`http://127.0.0.1:8000/search/${videoInput}/`);
    const response = request.json();
    response.then(result => {
      const data = JSON.parse(result.data);
      if (data) {
        setIsLoading(false);
        setSearchResults(data)
      }
    });
  }

  function handleDownloadClick(e: any) {
    downloadByURL(e.target.id);
  }

  function handleChange(e: any) {
    setVideoInput(e.target.value);
  }

  return (
    <>
      <div className='app'>  
        <h1>Youtube Music Downloader</h1>
        <input type="text" className='video-input' onChange={handleChange} />
        {
          downloadableByURL && <button className='download-btn' onClick={() => downloadByURL(videoInput)}>Download</button>
          || 
          searchButton && <button className='download-btn' onClick={getResults}>Search</button>
        }
        {
          isLoading && <div className='loader'></div>
        }
        {
          downloadResponse && <div className='succes-div'>Download successful!</div>
        }
        {
          searchResults.length > 0 && <div className='search-results'>
            {
              searchResults.map((result, idx) => (
                <Box 
                  key={idx}
                  id={result.id} 
                  cover={result.cover} 
                  title={result.title}
                  handleDownloadClick={handleDownloadClick}/>
              ))
            }
          </div>
        }
      </div>
    </>
  )
}

export default App;