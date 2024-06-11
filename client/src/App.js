import * as api from './api';
import './App.css';
import {useState} from 'react';
import Links from './Links';

function App() {
  const [url,setUrl] = useState("https://www.google.com");
  const [isLoading,setIsLoading] = useState(false);
  const [result, setResult] = useState({
    url: '',
    links: []
  });

  const saveCurrentUrl = () => {
    setIsLoading(true);
    api.saveUrl(url).then(setResult).finally(() => {
      setIsLoading(false);
    })
  }
  return (
    <div className="App">
      <div className='inputs'>
      <label>Insert URL: </label>
      <input
      type="text"
      className='urlInput'
      value={url}
      onChange={(event) => setUrl(event.target.value)}
    />
    <button onClick={saveCurrentUrl} disabled={isLoading}>{isLoading ? 'loading...' : 'save'}</button>
      </div>

    <Links {...result} />
    </div>
  );
}

export default App;
