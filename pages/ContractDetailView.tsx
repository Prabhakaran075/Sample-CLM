import React, { useState } from 'react';
import type { Contract } from '../../types';
import { ContractStatus } from '../../types';
import WorkflowPanel from '../components/contracts/WorkflowPanel';
import ContractAuditFeed from '../components/contracts/ContractAuditFeed';
import SignButton from '../components/contracts/SignButton';
import AIInsightsPanel from '../components/contracts/AIInsightsPanel';
import { MicrophoneIcon, VideoCameraIcon } from '../components/icons/IconComponents';
import { GoogleGenAI, Type } from '@google/genai';

interface ContractDetailViewProps {
  contract: Contract;
  onBack: () => void;
}

const statusColors: Record<ContractStatus, string> = {
  [ContractStatus.DRAFT]: 'bg-gray-100 text-gray-800',
  [ContractStatus.IN_REVIEW]: 'bg-yellow-100 text-yellow-800',
  [ContractStatus.APPROVED]: 'bg-blue-100 text-blue-800',
  [ContractStatus.SIGNED]: 'bg-green-100 text-green-800',
  [ContractStatus.REJECTED]: 'bg-red-100 text-red-800',
  [ContractStatus.EXPIRED]: 'bg-purple-100 text-purple-800',
};

const ContractStatusBadge: React.FC<{ status: ContractStatus }> = ({ status }) => (
  <span className={`px-2.5 py-1 text-sm font-semibold rounded-full ${statusColors[status]}`}>
    {status}
  </span>
);

const InfoItem: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
);

const ContractDetailView: React.FC<ContractDetailViewProps> = ({ contract, onBack }) => {
  const [currentContract, setCurrentContract] = useState<Contract>(contract);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [videoAnalysis, setVideoAnalysis] = useState('');
  const [isAnalyzingVideo, setIsAnalyzingVideo] = useState(false);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

  const handleExtractClauses = async () => {
    setIsExtracting(true);

    // Mock contract text. In a real app, this would be fetched or available.
    const mockContractText = `
      This ${currentContract.title} ("Agreement") is entered into on this 15th day of July, 2024, by and between ${currentContract.parties[0]} ("Client") and ${currentContract.parties[1]} ("Provider").
      
      1. Scope of Work. Provider shall perform the services as described in any applicable Statement of Work ("SOW") which shall be incorporated herein by reference.
      
      2. Term. This Agreement shall commence on the signature date and continue until ${currentContract.expiryDate}, unless terminated earlier as provided herein.
      
      3. Compensation. Client agrees to pay Provider the fees set forth in each SOW. Invoices are due and payable within thirty (30) days of receipt. Late payments shall incur a penalty of 1.5% per month.
      
      4. Confidential Information. Both parties agree to hold each other's Confidential Information in strict confidence. "Confidential Information" includes, but is not limited to, business plans, customer lists, and financial information. This obligation survives termination of this Agreement.
      
      5. Limitation of Liability. NEITHER PARTY'S LIABILITY HEREUNDER SHALL EXCEED THE TOTAL AMOUNT PAID BY CLIENT TO PROVIDER IN THE SIX (6) MONTHS PRECEDING THE CLAIM.
      
      6. Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of California.
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const prompt = `From the following contract text, extract the key legal clauses. For each clause, provide a short title and the full text content of that clause.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { text: prompt },
                { text: `\n\n--- CONTRACT TEXT ---\n${mockContractText}` },
            ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              extractedClauses: {
                type: Type.ARRAY,
                description: "An array of key clauses extracted from the contract.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "The title of the clause (e.g., 'Term and Termination')." },
                    content: { type: Type.STRING, description: "The full text content of the clause." }
                  },
                  required: ["title", "content"]
                }
              }
            },
            required: ["extractedClauses"]
          }
        }
      });
      
      const result = JSON.parse(response.text.trim());
      const extractedClauses = result.extractedClauses || [];

      if (extractedClauses.length > 0) {
        setCurrentContract(prev => ({
          ...prev,
          aiInsights: {
            ...(prev.aiInsights!), // aiInsights must exist to see the panel
            extractedClauses: extractedClauses,
          }
        }));
      } else {
          alert("AI could not extract clauses from this document.");
      }

    } catch (error) {
      console.error("Error extracting clauses with Gemini:", error);
      alert("An error occurred while communicating with the AI. Please try again.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      // Logic to stop recording would go here
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    setIsTranscribing(true);
    setTranscription('');

    // Mock audio recording and transcription API call
    setTimeout(() => {
        setIsRecording(false);
        setTimeout(() => {
            setTranscription("This is a transcribed note: The vendor agreed to a 10% discount on the annual fee if we sign before the end of the quarter. This needs to be reflected in the final draft.");
            setIsTranscribing(false);
        }, 1500);
    }, 2000); // Simulate 2 seconds of recording
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsAnalyzingVideo(true);
    setVideoAnalysis(`Analyzing "${file.name}"...`);
    
    // Mock video analysis API call
    setTimeout(() => {
        setVideoAnalysis(`Video Summary:\n- Key Decision: The renewal term was set to 24 months.\n- Action Item: Legal team to add a new data privacy addendum before Friday.`);
        setIsAnalyzingVideo(false);
    }, 3000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <button onClick={onBack} className="text-sm font-semibold text-primary-600 hover:text-primary-800">
          &larr; Back to all contracts
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        {/* Header */}
        <div className="md:flex md:items-start md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {currentContract.title}
                </h2>
                 <div className="mt-2 flex items-center text-sm text-gray-500">
                    Version {currentContract.version} &bull; Last updated {currentContract.lastUpdated}
                </div>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
               <ContractStatusBadge status={currentContract.status} />
            </div>
        </div>
        
        {/* Metadata */}
        <div className="mt-8 border-t border-gray-200 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <InfoItem label="Parties" value={currentContract.parties.join(', ')} />
            <InfoItem label="Expiry Date" value={currentContract.expiryDate} />
            <InfoItem label="Contract ID" value={currentContract.id} />
             <div className="col-span-2 md:col-span-4">
                 <SignButton contractStatus={currentContract.status} />
            </div>
        </div>
      </div>
      
      {/* AI, Workflow and Audit Log */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 grid grid-cols-1 gap-8">
            <div className="col-span-1">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Insights</h3>
                 {currentContract.aiInsights ? (
                    <AIInsightsPanel 
                      insights={currentContract.aiInsights}
                      onExtractClauses={handleExtractClauses}
                      isExtracting={isExtracting}
                    />
                 ) : (
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        AI analysis is not available for this contract.
                    </div>
                 )}
            </div>
            <div className="col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Media & Notes</h3>
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                    {/* Audio Transcription */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800">Audio Notes</h4>
                        <button onClick={handleRecord} disabled={isTranscribing} className="w-full mt-2 flex items-center justify-center text-sm font-medium text-primary-700 bg-primary-100 hover:bg-primary-200 px-3 py-2 rounded-md disabled:bg-gray-200">
                            <MicrophoneIcon className="w-5 h-5 mr-2" />
                            {isRecording ? 'Recording...' : isTranscribing ? 'Transcribing...' : 'Record Audio Note'}
                        </button>
                        {transcription && <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md italic">"{transcription}"</p>}
                    </div>
                    {/* Video Analysis */}
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-semibold text-gray-800">Meeting Analysis</h4>
                        <input type="file" ref={videoInputRef} onChange={handleVideoUpload} className="hidden" accept="video/*" />
                        <button onClick={() => videoInputRef.current?.click()} disabled={isAnalyzingVideo} className="w-full mt-2 flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md disabled:bg-gray-200">
                           <VideoCameraIcon className="w-5 h-5 mr-2" />
                           {isAnalyzingVideo ? 'Analyzing...' : 'Upload Meeting Video'}
                        </button>
                        {videoAnalysis && <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{videoAnalysis}</p>}
                    </div>
                </div>
            </div>
        </div>
        <div className="lg:col-span-1 space-y-8">
            <div>
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Workflow</h3>
                 {currentContract.workflow ? (
                    <WorkflowPanel workflow={currentContract.workflow} />
                 ) : (
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        No workflow has been started for this contract.
                    </div>
                 )}
            </div>
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Audit Log</h3>
                    <button onClick={() => alert('Generating CSV export...')} className="text-xs font-semibold text-primary-600 hover:text-primary-800 border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-50">
                      Export
                    </button>
                </div>
                 {currentContract.auditLog && currentContract.auditLog.length > 0 ? (
                    <ContractAuditFeed auditLogs={currentContract.auditLog} />
                 ) : (
                     <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        No activities have been logged for this contract.
                    </div>
                 )}
            </div>
        </div>
      </div>

    </div>
  );
};

export default ContractDetailView;