import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const playlist = [
  {
    id: 1,
    title: 'Lofi Chill Beats',
    artist: 'Lofi Artist',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    img: 'https://placehold.co/80x80?text=Lofi'
  },
  {
    id: 2,
    title: 'Electronic Vibes',
    artist: 'Electro Star',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    img: 'https://placehold.co/80x80?text=Electro'
  },
  {
    id: 3,
    title: 'Ambient Relaxation',
    artist: 'Ambient Soul',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    img: 'https://placehold.co/80x80?text=Ambient'
  },
];

const MusicPlayer = () => {
  const [current, setCurrent] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (track) => {
    if (track.id !== current.id) {
      setCurrent(track);
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  return (
    <motion.div
      className="p-4 rounded shadow"
      style={{
        background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
        maxWidth: '500px',
        margin: '0 auto',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center text-white mb-4">🎵 Music Player</h2>

      <div className="card mb-4 border-0 shadow-sm rounded">
        <div className="card-body text-center">
          <img src={current.img} className="rounded-circle mb-3" alt={current.title} />
          <h5 className="card-title">{current.title}</h5>
          <p className="card-text">{current.artist}</p>
          <button
            className={`btn ${isPlaying ? 'btn-danger' : 'btn-success'} px-4 rounded-pill`}
            onClick={handlePlayPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <audio ref={audioRef} src={current.url} />
        </div>
      </div>

      <h5 className="text-white">🎧 Playlist</h5>
      <ul className="list-group">
        {playlist.map((track) => (
          <li
            key={track.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              track.id === current.id ? 'active text-white' : ''
            }`}
            onClick={() => handleSelectTrack(track)}
            style={{ cursor: 'pointer' }}
          >
            <img src={track.img} alt={track.title} className="rounded-circle me-2" style={{ width: '40px' }} />
            <span className="flex-grow-1">{track.title}</span>
            <span className="badge bg-secondary">{track.artist}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MusicPlayer;
