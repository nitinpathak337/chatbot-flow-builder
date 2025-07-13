import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './FlowBuilder.css';

import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

/**
 * FlowBuilder component - Main component that handles the chatbot flow building
 * Features:
 * - Drag and drop nodes from panel to flow
 * - Connect nodes with edges
 * - Select nodes to edit in settings panel
 * - Save flow with validation
 * - Enforce connection rules (one source, multiple targets)
 */
const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  /**
   * Handle connection between nodes
   * Enforces rule: source handle can only have one outgoing edge
   */
  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has a connection
      const existingEdge = edges.find(edge => 
        edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
      
      if (existingEdge) {
        // Remove existing edge before adding new one
        setEdges((eds) => eds.filter(edge => edge.id !== existingEdge.id));
      }
      
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  /**
   * Handle drag over event for drop zone
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle drop event - create new node at drop position
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          text: type === 'textNode' ? 'New message' : 'New node' 
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Handle node selection
   */
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Handle clicking on empty space - deselect node
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Update node data
   */
  const onUpdateNode = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  /**
   * Handle back button in settings panel
   */
  const onBackToNodes = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Validate and save the flow
   * Shows error if more than one node has empty target handles
   */
  const onSave = useCallback(() => {
    setSaveError('');
    setSaveSuccess('');
    
    if (nodes.length <= 1) {
      setSaveSuccess('Flow saved successfully!');
      setTimeout(() => setSaveSuccess(''), 3000); // Clear success after 3 seconds
      return;
    }

    // Find nodes with empty target handles
    const nodesWithEmptyTargets = nodes.filter(node => {
      const hasIncomingEdge = edges.some(edge => edge.target === node.id);
      return !hasIncomingEdge;
    });

    if (nodesWithEmptyTargets.length > 1) {
      setSaveError('Cannot save Flow');
      setTimeout(() => setSaveError(''), 3000); // Clear error after 3 seconds
      return;
    }

    setSaveSuccess('Flow saved successfully!');
    setTimeout(() => setSaveSuccess(''), 3000); // Clear success after 3 seconds
  }, [nodes, edges]);

  return (
    <div className="flow-builder">
      <ReactFlowProvider>
        <div className="flow-container">
          {/* Main flow area */}
          <div className="flow-main" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>

          {/* Side panel - either nodes panel or settings panel */}
          <div className="side-panel">
            {selectedNode ? (
              <SettingsPanel
                selectedNode={selectedNode}
                onUpdateNode={onUpdateNode}
                onBack={onBackToNodes}
              />
            ) : (
              <NodesPanel />
            )}
          </div>
        </div>

        {/* Top bar with save button */}
        <div className="top-bar">
          <div></div> {/* Empty div for spacing */}
          <button className="save-button" onClick={onSave}>
            Save Changes
          </button>
        </div>

        {/* Snackbar alert for save errors */}
        {saveError && (
          <div className="snackbar-alert error">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">{saveError}</span>
          </div>
        )}

        {/* Snackbar alert for save success */}
        {saveSuccess && (
          <div className="snackbar-alert success">
            <span className="alert-icon">✅</span>
            <span className="alert-text">{saveSuccess}</span>
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder; 