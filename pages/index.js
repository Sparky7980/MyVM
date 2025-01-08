import { useState, useEffect } from 'react';

export default function Home() {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Update the screen image every 2 seconds
    const interval = setInterval(() => {
      setImageSrc(`/screenshot.png?timestamp=${Date.now()}`); // Cache-busting with timestamp
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const sendClickAction = async () => {
    // Send a click event to Laptop B to simulate a mouse click
    await fetch('/api/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'mouse-click', target: 'chrome' }), // Specify action and target (e.g., Chrome)
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Remote Screen</h1>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Remote Screen"
          style={{ width: '80%', border: '1px solid #ddd', marginBottom: '20px' }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={sendClickAction} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Click Me
      </button>
    </div>
  );
}
