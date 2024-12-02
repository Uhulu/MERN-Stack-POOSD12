import { useEffect, useState } from 'react';
import './Home.css';


const Home = () => {
    const [constellations, setConstellations] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
    const [showFullDescription, setShowFullDescription] = useState({}); // State to manage description visibility

    useEffect(() => {
        const fetchConstellations = async () => {
            const response = await fetch('http://localhost:4000/api/constel'); // Fetch request from backend
            const json = await response.json();

            if (response.ok) {
                setConstellations(json); // Gets array of JSON from constellation controller
            }
        };

        fetchConstellations();

                // Create starry background
                const createStars = () => {
                    const starContainer = document.querySelector('.starry-background');
                    for (let i = 0; i < 200; i++) { // Adjust the number of stars as needed
                        const star = document.createElement('div');
                        star.className = 'star';
                        star.style.top = `${Math.random() * 100}%`;
                        star.style.left = `${Math.random() * 100}%`;
                        star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize flicker duration
                        starContainer.appendChild(star);
                    }
                };
        
                createStars();


    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter constellations based on search query
    const filteredConstellations = constellations?.filter((constellation) =>
        constellation.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Toggle description visibility for a specific constellation
    const toggleDescription = (id) => {
        setShowFullDescription((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle the boolean value
        }));
    };

    return (

        
        <div className="home">
            {/* Starry Background */}
            <div className="starry-background"></div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search constellations..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />

            {/* Display filtered constellations */}
            <div className="constellations">
                {filteredConstellations && filteredConstellations.length > 0 ? (
                    filteredConstellations.map((constellation) => {
                        const isFullDescriptionShown = showFullDescription[constellation._id];
                        const shortenedDescription = constellation.Description.slice(0, 100); // Display first 100 characters

                        return (
                            <div key={constellation._id} className="constellation-item">
                                <h3>{constellation.Name}</h3>
                                <center>
                                    <img
                                        src={constellation.Image}
                                        alt={`Image of ${constellation.Name}`}
                                        className="constellation-image"
                                        style={{ width: '200px', height: 'auto' }}
                                    />
                                </center>
                                <p>{constellation.Meaning}</p>

                                {/* Description with toggle */}
                                <p>
                                    {isFullDescriptionShown
                                        ? constellation.Description
                                        : `${shortenedDescription}...`}
                                </p>
                                <button
                                    onClick={() => toggleDescription(constellation._id)}
                                    style={{
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        border: '1px solid white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '0',
                                    }}
                                >
                                    {isFullDescriptionShown ? '−' : '+'}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No constellations found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
