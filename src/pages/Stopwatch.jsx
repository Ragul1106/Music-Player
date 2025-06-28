import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RiResetLeftFill } from "react-icons/ri";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="p-5 text-center shadow-lg mx-auto mt-5"
      style={{
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#222',
        border: '6px solid white',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)'
      }}
    >
      <h4 className="mb-3 fw-bold">⏱ Stopwatch</h4>

      <motion.h1
        key={time}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fw-bold display-5"
      >
        {formatTime(time)}
      </motion.h1>

      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-success px-3 fw-bold"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          ▶ Start
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-danger px-3 fw-bold"
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          ⏸ Stop
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-warning text-black px-3 fw-bold"
          onClick={() => {
            setTime(0);
            setRunning(false);
          }}
        >
          <RiResetLeftFill /> Reset
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Stopwatch;
