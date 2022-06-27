
import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Localbase from 'localbase'




function App() {
  
  let db = new Localbase('db')


  useEffect(()=>{
    const fetchVid= async ()=>{
      setLoading(true);
      console.log('poop');
      const request = indexedDB.open('cacheVid', 1);
      const query1 =  await axios.get('https://media.istockphoto.com/videos/woodworker-drills-holes-in-wooden-plank-with-drilling-machine-in-slow-video-id1306134996').then(  res=>  {
        const myUrl = (window.URL || window.webkitURL).createObjectURL( new Blob([res.data]) )
        db.collection('videos').add({
          id: 1,
          vid:myUrl
        })
        console.log(myUrl);
        console.log('poop');
      });
        
      const query2 =  await axios.get('https://media.istockphoto.com/videos/woodworker-drills-holes-in-wooden-plank-with-drilling-machine-in-slow-video-id1306134996').then( res=>{
        const myUrl = (window.URL || window.webkitURL).createObjectURL( new Blob([res.data]) )
        db.collection('videos').add({
          id: 1,
          vid:myUrl
        })
      })
      setLoading(false);
      console.log('🥹')
    }
    fetchVid();
  },[])

  const data = db.collection('videos').get().then(res => {
    data = res
  })
 
  const[loading,setLoading] =useState(true)
  const[vid,setVid] = useState('');
  const handleEnd=()=>{
      setVid('')
  }


  return (
    <div className="App">
      {console.log('')}
      {/* {loading?<p>loading...</p>:
      <video loop autoPlay muted id='bgrVideo' onEnded={handleEnd}>
          <source src={vid} />Your browser does not support the video tag.
      </video> } */}
    </div>
  )
}

export default App
