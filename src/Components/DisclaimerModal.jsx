import React, { useState, useEffect } from 'react';

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup when the page loads
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>💡 Quick Tip / Graph Controls</h3> <br />
        <p>
          By <strong>Right-Clicking</strong> on  any Node You can Toggle Between
          <span style={{ color: '#4CAF50', fontWeight: 'bold' }}> Start Node</span> and
          <span style={{ color: '#F44336', fontWeight: 'bold' }}> Target Node</span> .
        </p>
        <button onClick={() => setIsOpen(false)} style={buttonStyle}>
          Got it!
        </button>
      </div>
    </div>
  );
};

// Inline Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: '24px',
  borderRadius: '12px',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  border: '1px solid #333',
};

const buttonStyle = {
  marginTop: '16px',
  padding: '8px 20px',
  backgroundColor: '#007acc',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default DisclaimerModal;