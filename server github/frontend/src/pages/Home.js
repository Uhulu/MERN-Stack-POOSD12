import {useEffect, useState} from 'react'

const Home = () => {
    const [constellations,setConstellations] = useState(null)
    
    useEffect(() =>{
        const fetchConstellations = async () =>{
            const response = await fetch('http://localhost:4000/api/constel') //fetch request from backend
            const json = await response.json()

            if(response.ok){ //only does if no error
                setConstellations(json) //gets array of json from constelation Controller
            }
        }

        fetchConstellations()
    },[])
 
    return (
        <div className="home">
          <div className="constellations">
            {constellations && constellations.map((constellation) => (
              <div key={constellation._id} className="constellation-item">
                {/* Display the constellation name */}
                <h3>{constellation.Name}</h3>
                
                {/* Display the image */}
                <img 
                  src={constellation.Image} 
                  alt={`Image of ${constellation.Name}`} 
                  className="constellation-image"
                  style={{ width: '200px', height: 'auto' }} // Adjust styles as needed
                />
                
                {/* Display the meaning */}
                <p>{constellation.Meaning}</p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Home