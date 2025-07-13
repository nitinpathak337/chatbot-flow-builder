import React from 'react';
import { Handle, Position } from 'reactflow';

/**
 * TextNode component represents a message node in the chatbot flow
 * Features:
 * - Displays message text
 * - Has a target handle (can receive multiple connections)
 * - Has a source handle (can have only one outgoing connection)
 * - Shows message icon and styling
 */
const TextNode = ({ data, selected }) => {
  return (
    <div className={`text-node ${selected ? 'selected' : ''}`}>
      {/* Target handle - can receive multiple connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="target-handle"
        isConnectable={true}
      />
      
      {/* Node header with icon and title */}
      <div className="node-header">
        <span className="message-icon">💬</span>
        <span className="node-title">Send Message</span>
      </div>
      
      {/* Node content - displays the message text */}
      <div className="node-content">
        <div className="message-text">
          {data.text || 'Enter your message...'}
        </div>
      </div>
      
      {/* Source handle - can have only one outgoing connection */}
      <Handle
        type="source"
        position={Position.Right}
        className="source-handle"
        isConnectable={true}
      />
    </div>
  );
};

export default TextNode; 