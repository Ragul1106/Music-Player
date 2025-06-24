import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

import Theethiriyaai from '../assets/audios/Theethiriyaai.mp3';
import UnmaiKadhalYaarEndral from '../assets/audios/Unmai Kadhal Yaar Endral.mp3';
import Uyirey from '../assets/audios/Uyirey.mp3';

const playlist = [
  {
    id: 1,
    title: 'Theethiriyaai',
    artist: 'Sid Sriram',
    url: Theethiriyaai,
    img: 'https://placehold.co/80x80?text=Brahmastra',
  },
  {
    id: 2,
    title: 'Unmai Kadhal Yaar Endral',
    artist: 'Sweta Mohan',
    url: UnmaiKadhalYaarEndral,
    img: 'https://placehold.co/80x80?text=I',
  },
  {
    id: 3,
    title: 'Uyirey Bgm',
    artist: 'G.V.Prakash',
    url: Uyirey,
    img: 'https://placehold.co/80x80?text=Amaran',
  },
];

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const current = playlist[currentIndex];

  const play = () => {
    if (audioRef.current) audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    isPlaying ? pause() : play();
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => play(), 100);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(false);
    setTimeout(() => play(), 100);
  };

  const handleSelectTrack = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setIsPlaying(false);
      setTimeout(() => play(), 100);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleNext);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleNext);
      }
    };
  }, [currentIndex]);

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

      <motion.div
        className="card mb-4 border-0 shadow-sm rounded"
        animate={
          isPlaying
            ? { scale: [1, 1.02, 1], rotate: [0, 1.5, -1.5, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={
          isPlaying
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
        style={{
          boxShadow: isPlaying
            ? '0 0 20px rgba(255, 0, 150, 0.4)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          background: isPlaying
            ? 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)'
            : '#fff',
          overflow: 'hidden',
        }}
      >

        <div className="card-body text-center">
          <motion.img
            key={isPlaying ? 'playing' : 'paused'}
            src={current.img}
            alt={current.title}
            className="rounded-circle mb-3"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { duration: 6, repeat: Infinity, ease: 'linear' }
                : { duration: 0.5 }
            }
          />


          <h5 className="card-title">{current.title}</h5>
          <p className="card-text">{current.artist}</p>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-outline-secondary rounded-circle"
              onClick={handlePrev}
            >
              <FaStepBackward />
            </button>
            <button
              className={`btn ${isPlaying ? 'btn-danger' : 'btn-success'} rounded-circle`}
              onClick={handlePlayPause}
              style={{ width: '50px', height: '50px' }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="btn btn-outline-secondary rounded-circle"
              onClick={handleNext}
            >
              <FaStepForward />
            </button>
          </div>

          <audio ref={audioRef} src={current.url} />
        </div>
      </motion.div>

      <h5 className="text-white">🎧 Playlist</h5>
      <ul className="list-group">
        {playlist.map((track, index) => (
          <li
            key={track.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${index === currentIndex ? 'active text-white' : ''
              }`}
            onClick={() => handleSelectTrack(index)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={track.img}
              alt={track.title}
              className="rounded-circle me-2"
              style={{ width: '40px' }}
            />
            <span className="flex-grow-1">{track.title}</span>
            <span className="badge bg-secondary">{track.artist}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MusicPlayer;
