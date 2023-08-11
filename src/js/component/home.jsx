import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const audioUrl = "https://assets.breatheco.de/apis/sound/";

  const fetchSongs = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs');
      if (response.ok) {
        const data = await response.json();
        const songsURLs = data.map(song => ({
          ...song,
          url: audioUrl + song.url
        }));
        setSongs(songsURLs);
      } else {
        console.error("Error fetching songs data");
      }
    } catch (error) { 
      console.error("Error fetching songs data:", error);
    }
  };

  const playSong = (index) => {
    if (index >= 0 && index < songs.length) {
      setCurrentSongIndex(index);
      audioRef.current.src = songs[index].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
       <div
        style={{
          height: "calc(100vh - 200px)",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
        }}
      >
        <ol className="list-group">
          {/* Mapear cada canción en la lista */}
          {songs.map((item, index) => (
            <li
              key={item.id}
              // Manejar clic en la canción para reproducir
              onClick={() => playSong(index)}
              // Aplicar estilo si es la canción actual
              className={`list-group-item ${
                currentSongIndex === index ? "bg-dark text-white" : ""
              }`}
            >
              {/* Mostrar el número de la canción y el nombre */}
              <span className="mr-2">{index + 1}.</span>
              {item.name}
            </li>
          ))}
        </ol>
      </div>
      {/* Controles de reproducción */}
      <div
        className="bg-dark"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          textAlign: "center",
        }}
      ></div>
      <div className="bg-dark" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", textAlign: "center" }}>
        <button onClick={playPreviousSong}> 
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-rewind-btn-fill" viewBox="0 0 16 16">
  <path d="M0 4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2Zm7.729 1.055A.5.5 0 0 1 8 5.5v1.886l3.21-2.293A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8 8.614V10.5a.5.5 0 0 1-.79.407l-3.5-2.5a.5.5 0 0 1 0-.814l3.5-2.5a.5.5 0 0 1 .519-.038Z"/>
</svg> 
        </button>
        {isPlaying ? (
          <button onClick={pauseSong}> 
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pause-btn-fill" viewBox="0 0 16 16">
  <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.25-7C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
</svg>
          </button>
        ) : (
          <button onClick={() => playSong(currentSongIndex)}> 
           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
  <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>
          </button>
        )}
        <button onClick={playNextSong}> 
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-fast-forward-btn-fill" viewBox="0 0 16 16">
  <path d="M0 4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2Zm4.271 1.055a.5.5 0 0 1 .52.038L8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445Z"/>
</svg>
        </button>
      </div>
     
    </div>
  );
};

export default Home;

