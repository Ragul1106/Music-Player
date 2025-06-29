import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRandom, FaRedo, FaStepForward, FaStepBackward } from 'react-icons/fa';

import AdiyeSakkarakatti from '../assets/audios/Adiye-Sakkarakatti.mp3';
import Azhage from '../assets/audios/Azhage.mp3';
import EnnaVilai from '../assets/audios/Enna-Vilai.mp3';
import HeyMinnale from '../assets/audios/Hey Minnale.mp3';
import KadhaleKadhale from '../assets/audios/Kadhale-Kadhale.mp3';
import Kanimaa from '../assets/audios/Kanimaa.mp3';
import Maattikkichey from '../assets/audios/Maattikkichey.mp3';
import Minnalena from '../assets/audios/Minnalena.mp3';
import NaanSiricha from '../assets/audios/Naan-Siricha.mp3';
import NaanUn from '../assets/audios/Naan-Un.mp3';
import OhShanthiShanthi from '../assets/audios/Oh-Shanthi-Shanthi.mp3';
import ParaParaNew from '../assets/audios/Para Para New.mp3';
import RojaRoja from '../assets/audios/Roja-Roja.mp3';
import SaiPallavisIntro from '../assets/audios/Sai Pallavi\'s Intro.mp3';
import TakkunuTakkunu from '../assets/audios/Takkunu-Takkunu.mp3';
import Theethiriyaai from '../assets/audios/Theethiriyaai.mp3';
import UnmaiKadhalYaarEndral from '../assets/audios/Unmai Kadhal Yaar Endral.mp3';
import Uyirey from '../assets/audios/Uyirey.mp3';
import VaadiNeeVaadi from '../assets/audios/Vaadi-Nee-Vaadi.mp3';
import Vazhithunaiye from '../assets/audios/Vazhithunaiye.mp3';
import VennilavuSaaral from '../assets/audios/Vennilavu Saaral.mp3';
import YendiVittuPona from '../assets/audios/Yendi Vittu Pona.mp3';

const playlist = [
  { id: 1, title: 'Adiye Sakkarakatti', artist: 'HipHop Tamizha', url: AdiyeSakkarakatti, img: 'https://placehold.co/80x80?text=Meesaya+Murukku' },
  { id: 2, title: 'Azhage', artist: 'HipHop Tamizha', url: Azhage, img: 'https://placehold.co/80x80?text=Kathakali' },
  { id: 3, title: 'Enna Vilai', artist: 'Unni Menon', url: EnnaVilai, img: 'https://placehold.co/80x80?text=Kadhalar+Dhinam' },
  { id: 4, title: 'Hey Minnale', artist: 'G.V. Prakash', url: HeyMinnale, img: 'https://placehold.co/80x80?text=Amaran' },
  { id: 5, title: 'Kadhale Kadhale', artist: 'Shankar Mahadevan', url: KadhaleKadhale, img: 'https://placehold.co/80x80?text=Indru+Netru+Naalai' },
  { id: 6, title: 'Kanimaa', artist: 'Santhosh Narayanan', url: Kanimaa, img: 'https://placehold.co/80x80?text=Retro+2025' },
  { id: 7, title: 'Maattikkichey', artist: 'HipHop Tamizha', url: Maattikkichey, img: 'https://placehold.co/80x80?text=Meesaya+Murukku' },
  { id: 8, title: 'Minnalena', artist: 'Jakes Bejoy', url: Minnalena, img: 'https://placehold.co/80x80?text=Narivettai' },
  { id: 9, title: 'Naan Siricha', artist: 'HipHop Tamizha', url: NaanSiricha, img: 'https://placehold.co/80x80?text=Naan+Sirithal' },
  { id: 10, title: 'Naan Un', artist: 'Arijit Singh', url: NaanUn, img: 'https://placehold.co/80x80?text=24' },
  { id: 11, title: 'Oh Shanthi Shanthi', artist: 'Clinton & SPB', url: OhShanthiShanthi, img: 'https://placehold.co/80x80?text=Vaaranam+Aayiram' },
  { id: 12, title: 'Para Para New', artist: 'N.R. Raghunathan', url: ParaParaNew, img: 'https://placehold.co/80x80?text=Neerparavai' },
  { id: 13, title: 'Roja Roja', artist: 'Unnikrishnan', url: RojaRoja, img: 'https://placehold.co/80x80?text=Roja' },
  { id: 14, title: 'Sai Pallavi Intro', artist: 'G.V. Prakash', url: SaiPallavisIntro, img: 'https://placehold.co/80x80?text=Amaran' },
  { id: 15, title: 'Takkunu Takkunu', artist: 'Anirudh Ravichander', url: TakkunuTakkunu, img: 'https://placehold.co/80x80?text=Mr+Local' },
  { id: 16, title: 'Theethiriyaai', artist: 'Sid Sriram', url: Theethiriyaai, img: 'https://placehold.co/80x80?text=Brahmastra' },
  { id: 17, title: 'Unmai Kadhal Yaar Endral', artist: 'Sweta Mohan', url: UnmaiKadhalYaarEndral, img: 'https://placehold.co/80x80?text=I' },
  { id: 18, title: 'Uyirey', artist: 'G.V. Prakash', url: Uyirey, img: 'https://placehold.co/80x80?text=Amaran' },
  { id: 19, title: 'Vaadi Nee Vaadi', artist: 'HipHop Tamizha', url: VaadiNeeVaadi, img: 'https://placehold.co/80x80?text=Meesaya+Murukku' },
  { id: 20, title: 'Vazhithunaiye', artist: 'Leon James', url: Vazhithunaiye, img: 'https://placehold.co/80x80?text=Oh+My+Kadavule' },
  { id: 21, title: 'Vennilavu Saaral', artist: 'G.V. Prakash', url: VennilavuSaaral, img: 'https://placehold.co/80x80?text=Amaran' },
  { id: 22, title: 'Yendi Vittu Pona', artist: 'Leon James', url: YendiVittuPona, img: 'https://placehold.co/80x80?text=Dragon' },
];

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef(null);
  const current = playlist[currentIndex];

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    isPlaying ? pause() : play();
  };

  const handleNext = () => {
    let nextIndex = shuffle ? Math.floor(Math.random() * playlist.length) : (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => play(), 100);
  };

  const handlePrev = () => {
    let prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(false);
    setTimeout(() => play(), 100);
  };

  const handleSelectTrack = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => play(), 100);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      if (repeat) play();
      else handleNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [currentIndex, repeat, shuffle]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <motion.div className="p-4 rounded shadow" style={{ background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)', maxWidth: '500px', margin: '0 auto' }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-center text-white mb-3">
        🎵 Music Player <br />
        <small className="text-light fs-6">Playing {currentIndex + 1} of {playlist.length}</small>
      </h2>

      <motion.div className="card mb-4 border-0 shadow-sm rounded" animate={isPlaying ? { scale: [1, 1.02, 1], rotate: [0, 1.5, -1.5, 0] } : { scale: 1, rotate: 0 }} transition={isPlaying ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }} style={{ background: isPlaying ? 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)' : '#fff', boxShadow: isPlaying ? '0 0 20px rgba(255, 0, 150, 0.4)' : '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div className="card-body text-center">
          <motion.img src={current.img} alt={current.title} className="rounded-circle mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} animate={isPlaying ? { rotate: 360 } : { rotate: 0 }} transition={isPlaying ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }} />

          <h5 className="card-title">{current.title}</h5>
          <p className="card-text">{current.artist}</p>

          <div className="d-flex justify-content-center gap-3 mb-2">
            <button className="btn rounded-circle" onClick={() => setShuffle(!shuffle)} title="Shuffle">
              <FaRandom color={shuffle ? 'darkred' : 'gray'} />
            </button>
            <button className="btn rounded-circle" onClick={handlePrev}><FaStepBackward /></button>
            <button className={`btn ${isPlaying ? 'btn-danger' : 'btn-success'} rounded-circle`} onClick={handlePlayPause} style={{ width: '50px', height: '50px' }}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
            <button className="btn rounded-circle" onClick={handleNext}><FaStepForward /></button>
            <button className="btn rounded-circle" onClick={() => setRepeat(!repeat)} title="Repeat">
              <FaRedo color={repeat ? 'darkred' : 'gray'} />
            </button>
          </div>

          <div className="text-white small d-flex justify-content-between px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input type="range" min="0" max="100" value={(currentTime / duration) * 100 || 0} onChange={handleSeek} className="form-range mb-2" />

          <div className="d-flex align-items-center gap-2">
            <label className="text-white">🔊</label>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="form-range" style={{ flex: 1 }} />
          </div>

          <audio ref={audioRef} src={current.url} />
        </div>
      </motion.div>

      <h5 className="text-white">🎧 Playlist ({playlist.length})</h5>
      <ul className="list-group" style={{ maxHeight: '300px', overflowY: 'auto', borderRadius: '0.5rem', background: '#f8f9fa' }}>
        {playlist.map((track, index) => (
          <li key={track.id} className={`list-group-item d-flex justify-content-between align-items-center ${index === currentIndex ? 'active text-white' : ''}`} onClick={() => handleSelectTrack(index)} style={{ cursor: 'pointer' }}>
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