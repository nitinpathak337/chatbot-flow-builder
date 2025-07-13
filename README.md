# Chatbot Flow Builder

A React-based visual flow builder for creating chatbot conversation flows using React Flow.

## Features

### ✅ Implemented Features

1. **Text Node**
   - Drag and drop text message nodes
   - Edit message content in settings panel
   - Visual representation with message icon
   - Source and target handles for connections

2. **Nodes Panel**
   - Extensible design for adding new node types
   - Drag and drop functionality
   - Currently supports Message nodes
   - Easy to extend for future node types

3. **Settings Panel**
   - Appears when a node is selected
   - Text editing for message nodes
   - Back button to return to nodes panel
   - Extensible for different node types

4. **Flow Builder**
   - Visual flow creation with React Flow
   - Drag and drop nodes from panel
   - Connect nodes with edges
   - Zoom, pan, and minimap controls

5. **Connection Rules**
   - Source handle: Only one outgoing connection
   - Target handle: Multiple incoming connections allowed
   - Visual feedback for connections

6. **Save Functionality**
   - Validates flow before saving
   - Error message if more than one node has empty target handles
   - Success confirmation on valid save

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. **Adding Nodes**: Drag the Message node from the Nodes Panel to the flow area
2. **Connecting Nodes**: Click and drag from a source handle (bottom) to a target handle (top)
3. **Editing Nodes**: Click on a node to select it and edit its text in the Settings Panel
4. **Saving Flow**: Click "Save Changes" to validate and save the flow

## Technical Details

### Architecture

- **React Flow**: Core flow building functionality
- **Component Structure**: Modular, extensible design
- **State Management**: React hooks for local state
- **Styling**: Custom CSS with responsive design

### Key Components

- `FlowBuilder`: Main component managing the flow state
- `TextNode`: Custom node component for text messages
- `NodesPanel`: Draggable node types panel
- `SettingsPanel`: Node editing interface

### Connection Logic

- Source handles enforce single outgoing connection
- Target handles allow multiple incoming connections
- Validation prevents invalid flow structures

### Save Validation

The save function validates that:
- If there are multiple nodes, only one can have an empty target handle
- This ensures proper flow structure for chatbot execution

## Extending the Application

### Adding New Node Types

1. Create a new node component (e.g., `ImageNode.js`)
2. Add it to the `nodeTypes` object in `FlowBuilder.js`
3. Add the node to `NodesPanel.js` with drag functionality
4. Add settings for the node type in `SettingsPanel.js`

### Example: Adding an Image Node

```javascript
// ImageNode.js
const ImageNode = ({ data, selected }) => {
  return (
    <div className={`image-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span>🖼️</span>
        <span>Send Image</span>
      </div>
      <div className="node-content">
        <img src={data.imageUrl} alt="Preview" />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
```

## File Structure

```
src/
├── components/
│   ├── FlowBuilder.js      # Main flow builder component
│   ├── FlowBuilder.css     # Styles for all components
│   ├── TextNode.js         # Text message node component
│   ├── NodesPanel.js       # Draggable nodes panel
│   ├── SettingsPanel.js    # Node editing panel
│   └── index.js            # Component exports
├── App.js                  # Main app component
├── App.css                 # App-level styles
└── index.js                # React entry point
```




