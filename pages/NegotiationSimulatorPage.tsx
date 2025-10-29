import React, { useState, useRef, useEffect } from 'react';
import type { NegotiationMessage } from '../types';
import { CpuChipIcon, CheckCircleIcon } from '../components/icons/IconComponents';

const NegotiationSimulatorPage: React.FC = () => {
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [tone, setTone] = useState(50); // 0 (Aggressive) to 100 (Cooperative)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setMessages([
        { id: 'm1', sender: 'System', text: 'Simulation started. Buyer will make the first proposal.', timestamp: new Date().toLocaleTimeString() }
    ]);
    // TODO: Call backend API /api/negotiation/simulate
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Controls Panel */}
      <div className="w-1/3 bg-white rounded-l-lg shadow p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">Negotiation Simulator</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Simulate contract negotiations between AI agents to explore outcomes.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="context" className="block text-sm font-medium text-gray-700">Negotiation Context</label>
            <textarea
              id="context"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              defaultValue="Negotiating a 3-year SaaS subscription for 100 enterprise users. Key terms: pricing, SLA, data privacy."
            />
          </div>
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Buyer's Tone: <span className="font-semibold text-primary-600">{tone < 33 ? 'Aggressive' : tone > 66 ? 'Cooperative' : 'Neutral'}</span></label>
             <input
                id="tone"
                type="range"
                min="0"
                max="100"
                value={tone}
                onChange={(e) => setTone(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="mt-auto pt-6 border-t">
            <button
                onClick={handleStartSimulation}
                disabled={isSimulating}
                className="w-full flex justify-center items-center bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-primary-700 disabled:bg-gray-400"
            >
                {isSimulating ? 'Simulation in Progress...' : 'Start Simulation'}
            </button>
        </div>
      </div>

      {/* Transcript Panel */}
      <div className="w-2/3 bg-gray-50 rounded-r-lg shadow flex flex-col">
        <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Live Transcript</h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
            {messages.map(msg => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'System' ? 'justify-center' : ''}`}>
                    {msg.sender !== 'System' && (
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white ${msg.sender === 'Buyer' ? 'bg-blue-500' : 'bg-green-500'}`}>
                           <span className="text-xs font-bold">{msg.sender.charAt(0)}</span>
                        </div>
                    )}
                    <div className={`max-w-md p-3 rounded-lg ${
                        msg.sender === 'Buyer' ? 'bg-blue-100 text-blue-900' :
                        msg.sender === 'Vendor' ? 'bg-green-100 text-green-900' :
                        'bg-gray-200 text-gray-700 text-xs italic text-center w-full'
                    }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs text-right mt-1 opacity-60">{msg.timestamp}</p>
                    </div>
                </div>
            ))}
             <div ref={messagesEndRef} />
            </div>
             {!isSimulating && messages.length > 1 && (
                 <div className="text-center mt-6 p-4 bg-green-50 text-green-800 rounded-lg">
                     <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
                    <h4 className="font-semibold">Simulation Complete</h4>
                    <button className="text-sm font-semibold text-primary-600 hover:underline mt-2">Export Summary</button>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default NegotiationSimulatorPage;
