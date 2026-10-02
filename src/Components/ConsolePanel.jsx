import React, { useState, useEffect, useRef } from 'react';

export default function ConsolePanel({ logs, currentStep, structureState, visitedList }) {
  const [height, setHeight] = useState(200);
  const [isMinimized, setIsMinimized] = useState(false);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaY = startYRef.current - e.clientY;
      const newHeight = Math.max(80, Math.min(window.innerHeight * 0.7, startHeightRef.current + deltaY));
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startHeightRef.current = height;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const toggleMaximize = (e) => {
    e.stopPropagation();
    setIsMinimized(false);
    setHeight(height > 300 ? 180 : 380);
  };

  return (
    <div
      className={`console-panel ${isMinimized ? 'minimized' : ''}`}
      style={{ height: isMinimized ? '38px' : `${height}px` }}
    >
      {/* Resizable Bar */}
      <div className="drag-handle" onMouseDown={handleMouseDown}>
        <div className="handle-bar" />
      </div>

      {/* Header */}
      <div className="console-header">
        <div className="console-title-group">
          <div className="terminal-dots">
            <span className="dot red" onClick={toggleMinimize} title="Minimize"></span>
            <span className="dot yellow" onClick={toggleMinimize} title="Minimize"></span>
            <span className="dot green" onClick={toggleMaximize} title="Maximize"></span>
          </div>
          <span className="console-title">EXECUTION CONSOLE</span>
        </div>

        <div className="console-status-badge">
          <span className="pulse-dot"></span>
          <span>{currentStep || "SYSTEM READY"}</span>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <div className="console-body">
          <div className="ds-tracker">
            <div className="tracker-box">
              <div className="tracker-header">
                <span className="tracker-icon">⚡</span>
                <span className="tracker-label">QUEUE / STACK</span>
              </div>
              <div className="tracker-values">
                {structureState && structureState.length > 0 ? (
                  structureState.map((nodeId, idx) => (
                    <span key={idx} className="ds-chip queue-chip">Node {nodeId}</span>
                  ))
                ) : (
                  <span className="empty-badge">Empty</span>
                )}
              </div>
            </div>

            <div className="tracker-box">
              <div className="tracker-header">
                <span className="tracker-icon">🎯</span>
                <span className="tracker-label">VISITED SET</span>
              </div>
              <div className="tracker-values">
                {visitedList && visitedList.length > 0 ? (
                  visitedList.map((nodeId, idx) => (
                    <span key={idx} className="ds-chip visited-chip">Node {nodeId}</span>
                  ))
                ) : (
                  <span className="empty-badge">None</span>
                )}
              </div>
            </div>
          </div>

          <div className="log-list">
            {logs && logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                  <span className="log-timestamp">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                  <span className="log-arrow">❯</span>
                  <span className="log-text">{log}</span>
                </div>
              ))
            ) : (
              <div className="log-placeholder">
                <span className="terminal-prompt">$</span> Press <strong>Visualize</strong> to stream algorithm execution logs...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}