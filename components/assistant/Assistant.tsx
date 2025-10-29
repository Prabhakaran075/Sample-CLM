
import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, SparklesIcon, XCircleIcon } from '../icons/IconComponents';
import type { Contract, AssistantMessage } from '../../types';

interface AssistantProps {
  contractContext?: Contract | null;
}

const Assistant: React.FC<AssistantProps> = ({ contractContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: AssistantMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Mock AI response
    // TODO: Replace with a real call to an AI service (e.g., Gemini API)
    setTimeout(() => {
      let aiText = "I'm not sure how to help with that. Try asking to summarize the current contract.";
      if (contractContext) {
          if (/summarize|summary/.test(input.toLowerCase())) {
              aiText = `Here's a summary for "${contractContext.title}":\n- ${contractContext.aiInsights?.summary.join('\n- ')}`;
          } else if (/risk/.test(input.toLowerCase())) {
              aiText = `The AI-assessed risk level for "${contractContext.title}" is ${contractContext.aiInsights?.riskLevel}.`;
          } else if (/renewal|expiry|expire|end date/.test(input.toLowerCase())) {
              aiText = `The expiry date for "${contractContext.title}" is ${contractContext.expiryDate}.`;
          }
      } else {
        if (/find|search/.test(input.toLowerCase())) {
            aiText = "You can search for contracts using the search bar at the top of the page. To ask about a specific contract, please view one from the contracts list first."
        }
      }

      const aiMessage: AssistantMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-40 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Open AI Assistant"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 w-full max-w-sm h-[calc(100%-3rem)] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center">
            <SparklesIcon className="w-6 h-6 text-primary-600" />
            <h3 className="ml-2 text-lg font-bold text-gray-800">Contract Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
            <XCircleIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                    msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
             <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="p-4 border-t bg-white rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={contractContext ? `Ask about "${contractContext.title}"...` : "Select a contract to ask..."}
              className="w-full pr-12 pl-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={!contractContext}
            />
            <button onClick={handleSend} disabled={!contractContext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 disabled:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" /></svg>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Assistant;
