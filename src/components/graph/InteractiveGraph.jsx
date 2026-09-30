import React, { useState, useRef } from 'react';
import { 
  Users, 
  FileSearch, 
  Clock, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Filter, 
  Info, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCase } from '../../context/CaseContext';

export const InteractiveGraph = ({ graphData }) => {
  const { setSelectedEvidence, setSelectedPerson, setSelectedEvent, allEvidence, allPeople, allEvents } = useCase();

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const containerRef = useRef(null);

  const nodes = graphData?.nodes || [];
  const edges = graphData?.edges || [];

  const handleMouseDown = (e) => {
    if (e.target.closest('.node-element') || e.target.closest('.control-panel')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.6), 1.8));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 20, y: 20 });
  };

  const handleNodeClick = (node, e) => {
    e.stopPropagation();
    setSelectedNode(node);
  };

  const handleInspectEntity = (node) => {
    if (node.category === 'Person') {
      const person = allPeople.find(p => p.id === node.id);
      if (person) setSelectedPerson(person);
    } else if (node.category === 'Evidence') {
      const ev = allEvidence.find(e => e.id === node.id);
      if (ev) setSelectedEvidence(ev);
    } else if (node.category === 'Event') {
      const eventItem = allEvents.find(ev => ev.id === node.id);
      if (eventItem) setSelectedEvent(eventItem);
    }
  };

  const filteredNodes = nodes.filter(node => {
    if (filterCategory === 'all') return true;
    return node.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const getNodeById = (id) => nodes.find(n => n.id === id);

  const getNodeStyle = (category) => {
    switch (category) {
      case 'Person':
        return {
          bg: 'bg-purple-950/90 border-purple-500/70 text-purple-200',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
          icon: Users,
          color: '#a855f7'
        };
      case 'Evidence':
        return {
          bg: 'bg-cyan-950/90 border-cyan-500/70 text-cyan-200',
          glow: 'shadow-[0_0_15px_rgba(14,165,233,0.3)]',
          icon: FileSearch,
          color: '#0ea5e9'
        };
      case 'Event':
        return {
          bg: 'bg-amber-950/90 border-amber-500/70 text-amber-200',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
          icon: Clock,
          color: '#f59e0b'
        };
      case 'Location':
        return {
          bg: 'bg-emerald-950/90 border-emerald-500/70 text-emerald-200',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
          icon: MapPin,
          color: '#10b981'
        };
      default:
        return {
          bg: 'bg-dark-900 border-slate-700 text-slate-200',
          glow: '',
          icon: Info,
          color: '#94a3b8'
        };
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-2xl bg-[#080b12] border border-slate-800 overflow-hidden select-none flex">
      {/* Top Floating Controls */}
      <div className="control-panel absolute top-4 left-4 z-20 flex items-center gap-2 bg-dark-900/90 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md shadow-lg">
        {['all', 'Person', 'Evidence', 'Event', 'Location'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 text-xs font-mono rounded-lg capitalize transition-colors ${
              filterCategory === cat
                ? 'bg-crimson-950 text-crimson-400 border border-crimson-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {cat === 'all' ? 'All Entities' : cat}
          </button>
        ))}
      </div>

      {/* Right Zoom Controls */}
      <div className="control-panel absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-dark-900/90 border border-slate-800 p-1.5 rounded-xl backdrop-blur-md shadow-lg">
        <button
          onClick={() => handleZoom(0.15)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.15)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas Area with drag and SVG lines */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden grid-pattern`}
      >
        {/* Interactive Transform Wrapper */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
          className="relative w-[1100px] h-[800px]"
        >
          {/* SVG Relationship Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 7 3.5, 0 7" fill="#475569" />
              </marker>
              <marker
                id="arrowhead-conflict"
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 7 3.5, 0 7" fill="#f43f5e" />
              </marker>
            </defs>

            {edges.map((edge) => {
              const srcNode = getNodeById(edge.source);
              const tgtNode = getNodeById(edge.target);
              if (!srcNode || !tgtNode) return null;

              const isConflict = edge.isConflict || edge.type === 'Contradiction';
              const strokeColor = isConflict ? '#f43f5e' : '#334155';
              const strokeWidth = isConflict ? 2.5 : 1.5;

              // Midpoint for label
              const midX = (srcNode.x + tgtNode.x) / 2 + 50;
              const midY = (srcNode.y + tgtNode.y) / 2 + 20;

              return (
                <g key={edge.id}>
                  <line
                    x1={srcNode.x + 60}
                    y1={srcNode.y + 25}
                    x2={tgtNode.x + 60}
                    y2={tgtNode.y + 25}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isConflict ? '5,5' : undefined}
                    opacity="0.75"
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={midY}
                      fill={isConflict ? '#fb7185' : '#94a3b8'}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-dark-950 px-1 select-none"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Render Graph Nodes */}
          {filteredNodes.map((node) => {
            const style = getNodeStyle(node.category);
            const Icon = style.icon;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={node.id}
                onClick={(e) => handleNodeClick(node, e)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`
                }}
                className={`node-element cursor-pointer group flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-200 z-10 ${style.bg} ${style.glow} ${
                  isSelected ? 'ring-2 ring-white scale-105 shadow-2xl' : 'hover:scale-105'
                }`}
              >
                <div className="p-1 rounded-md bg-dark-950/80 border border-white/10 flex-shrink-0">
                  <Icon className="w-3.5 h-3.5" style={{ color: style.color }} />
                </div>
                <div className="truncate max-w-[130px]">
                  <p className="text-xs font-bold font-sans text-slate-100 truncate">{node.label}</p>
                  <p className="text-[9px] font-mono text-slate-400 truncate">{node.subcategory || node.role || node.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Side Inspector Drawer */}
      {selectedNode && (
        <div className="control-panel absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-dark-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md z-30 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                {selectedNode.category} Node • {selectedNode.id}
              </span>
              <h4 className="text-sm font-bold text-slate-100 font-sans mt-0.5">
                {selectedNode.label}
              </h4>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          <div className="text-xs text-slate-300 font-mono space-y-1">
            <p>Role / Context: <strong className="text-cyan-400">{selectedNode.role || selectedNode.subcategory || selectedNode.time}</strong></p>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400">Click to view full record</span>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => handleInspectEntity(selectedNode)}
            >
              Inspect Entity
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
