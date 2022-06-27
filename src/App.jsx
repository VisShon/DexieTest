
import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";



function App() {
  
  const db = new Dexie('caches');
    db.version(1).stores({
      videos: '++id, vid', // Primary key and indexed props
  });

  useEffect(()=>{
    const fetchVid= async ()=>{
      setLoading(true);
      const request = indexedDB.open('cacheVid', 1);
      const query1 =  await axios.get('https://media.istockphoto.com/videos/woodworker-drills-holes-in-wooden-plank-with-drilling-machine-in-slow-video-id1306134996').then(  res=>  {
        const myUrl = (window.URL || window.webkitURL).createObjectURL( new Blob([res.data]) )
        const id =  db.videos.add({
          vid:myUrl
        });
      });
        
      const query2 =  await axios.get('https://media.istockphoto.com/videos/woodworker-drills-holes-in-wooden-plank-with-drilling-machine-in-slow-video-id1306134996').then( res=>{
        const myUrl = (window.URL || window.webkitURL).createObjectURL( new Blob([res.data]) )
        const id =  db.videos.add({
          vid:myUrl
        });
      })
      setLoading(false);
    }
    fetchVid();
  },[])

  const video = useLiveQuery(
    () => db.videos.toArray()
  );
 
  const[loading,setLoading] =useState(true)
  const[vid,setVid] = useState('');
  const handleEnd=()=>{
      setVid('')
  }


  return (
    <div className="App">
      {console.log(video)}
      {/* {loading?<p>loading...</p>:
      <video loop autoPlay muted id='bgrVideo' onEnded={handleEnd}>
          <source src={vid} />Your browser does not support the video tag.
      </video> } */}
    </div>
  )
}

export default App
