import React, { useState, useEffect } from 'react';

/**
 * SettingsPanel component allows editing properties of selected nodes
 * Features:
 * - Replaces NodesPanel when a node is selected
 * - Text field to edit message text
 * - Back button to return to nodes panel
 * - Extensible design for different node types
 */
const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  const [text, setText] = useState('');

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  /**
   * Handle text change and update the node
   */
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    
    // Update the node data immediately
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { text: newText });
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h3>Settings</h3>
      </div>
      
      <div className="settings-content">
        {/* Settings for Text Node */}
        {selectedNode.type === 'textNode' && (
          <div className="setting-group">
            <label htmlFor="node-text">Text</label>
            <textarea
              id="node-text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your message..."
              rows="4"
              className="text-input"
            />
          </div>
        )}
        
        {/* Placeholder for other node types */}
        {/* This design makes it easy to add settings for new node types */}
        {/* 
        {selectedNode.type === 'imageNode' && (
          <div className="setting-group">
            <label htmlFor="image-url">Image URL</label>
            <input
              id="image-url"
              type="url"
              value={selectedNode.data.imageUrl || ''}
              onChange={(e) => onUpdateNode(selectedNode.id, { imageUrl: e.target.value })}
              placeholder="Enter image URL..."
              className="text-input"
            />
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default SettingsPanel; 