import React from 'react';

/**
 * NodesPanel component displays available node types that can be dragged to the flow
 * Features:
 * - Extensible design to easily add new node types
 * - Drag and drop functionality
 * - Currently supports Message/Text nodes
 */
const NodesPanel = () => {
  /**
   * Handle drag start event - sets the node type being dragged
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes Panel</h3>
      </div>
      
      <div className="nodes-list">
        {/* Message Node - draggable */}
        <div
          className="node-item"
          draggable
          onDragStart={(event) => onDragStart(event, 'textNode')}
        >
          <div className="node-preview">
            <span className="message-icon">💬</span>
            <span className="node-label">Message</span>
          </div>
          <div className="node-description">
            Send a text message
          </div>
        </div>
        
        {/* Placeholder for future node types */}
        {/* This design makes it easy to add new node types */}
        {/* 
        <div
          className="node-item"
          draggable
          onDragStart={(event) => onDragStart(event, 'imageNode')}
        >
          <div className="node-preview">
            <span className="message-icon">🖼️</span>
            <span className="node-label">Image</span>
          </div>
          <div className="node-description">
            Send an image
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default NodesPanel; 