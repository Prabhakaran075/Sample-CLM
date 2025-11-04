import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, SparklesIcon, XCircleIcon } from '../icons/IconComponents';
import type { Contract, AssistantMessage } from '../../types';
import { GoogleGenAI } from '@google/genai';

interface AssistantProps {
  contractContext?: Contract | null;
}

const Assistant: React.FC<AssistantProps> = ({ contractContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        setMessages([]);
        setInput('');
    }
  }, [isOpen, contractContext]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    setIsLoading(true);
    const userMessage: AssistantMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const prompt = `
            You are an AI assistant embedded in a Contract Lifecycle Management (CLM) system.
            A user is currently viewing a contract and has asked a question.
            
            USER'S QUESTION:
            "${currentInput}"

            CONTEXT of the contract they are viewing:
            - Title: ${contractContext!.title}
            - Parties: ${contractContext!.parties.join(', ')}
            - Status: ${contractContext!.status}
            - Expiry Date: ${contractContext!.expiryDate}
            - AI-Generated Summary: ${contractContext!.aiInsights?.summary.join('; ')}
            - AI-Assessed Risk Level: ${contractContext!.aiInsights?.riskLevel}

            Based on the user's question and the provided context, generate a helpful and concise response.
            If the question cannot be answered from the context, say so politely.
            Do not mention that you are an AI or that you were given context. Just answer the user's question directly.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const aiMessage: AssistantMessage = {
            id: `m-${Date.now() + 1}`,
            sender: 'ai',
            text: response.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        const errorMessage: AssistantMessage = {
            id: `m-${Date.now() + 1}`,
            sender: 'ai',
            text: "Sorry, I couldn't connect to the AI service. Please try again later.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
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
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                    msg.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                   <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-200' : 'text-gray-500'} text-right`}>{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                       <div className="flex items-center space-x-1">
                          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                       </div>
                    </div>
                </div>
            )}
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
              disabled={!contractContext || isLoading}
            />
            <button onClick={handleSend} disabled={!contractContext || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 disabled:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" /></svg>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Assistant;