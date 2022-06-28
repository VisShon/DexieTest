
import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";



function App() {
  
  const[loading,setLoading] =useState(true)
  const[vid,setVid] = useState(null);


  const db = new Dexie('caches');
    db.version(1).stores({
      videos: '++id, vid', // Primary key and indexed props
  });

  useEffect(()=>{
    const fetchVid= async ()=>{
      setLoading(true);

      let myUrl=null;
      const request = indexedDB.open('cacheVid', 1);
      const query1 =  await axios.get('https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_640_3MG.mp4').then(  res=>  {
        myUrl = window.URL.createObjectURL( new Blob([res.data]) )
      });
      const id1 = await db.videos.add({
        vid:myUrl
      });  
      setVid(await db.videos.where('id').equals(1).toArray());
      setLoading(false);
    }
    fetchVid();
  },[])
 
  const handleEnd= async ()=>{
    setVid(await db.videos.where('id').equals(2).toArray());
  }


  return (
    <div className="App">
      {loading?<p>loading...</p>:
      <video loop autoPlay muted id='bgrVideo'>
          <source src={vid[0].vid} />Your browser does not support the video tag.
      </video> }
    </div>
  )
}

export default App
