
import React, { useState, useRef } from 'react';
import { SparklesIcon, UploadCloudIcon } from '../icons/IconComponents';
import ActionModal from './ActionModal';
import { GoogleGenAI, Type } from '@google/genai';

// Helper to convert file to base64
const toBase64 = (file: File): Promise<{ data: string, mimeType: string }> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const data = result.split(',')[1];
        const mimeType = result.match(/:(.*?);/)?.[1] || file.type;
        if (!data) {
            reject(new Error("Could not convert file to base64"));
            return;
        }
        resolve({ data, mimeType });
    };
    reader.onerror = error => reject(error);
});

const GoogleDriveIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fill="#4285F4" d="M16.22,8.08l-3.14-5.44L10,8.08H16.22Z"></path>
        <path fill="#34A853" d="M6.91,8.08l3.13-5.43L13.18,8.08H6.91Z M6.59,8.77l-3.14,5.44h12.5L13.1,8.77H6.59Z"></path>
        <path fill="#F9BC05" d="M15.1,14.89l-3.13-5.44L8.83,14.89H15.1Z M15.41,15.58l3.14-5.43H6.08l3.13,5.43h6.2Z"></path>
        <path fill="#EA4335" d="M9.88,15.58l-3.14-5.44L3.6,15.58H9.88Z"></path>
    </svg>
);

const DropboxIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3l-5.33 3.2L8 9.4V3zm8 0l5.33 3.2L16 9.4V3zM2.67 6.2L8 9.4l5.33-3.2L8 3 2.67 6.2zm18.66 0L16 9.4l-5.33-3.2L16 3l5.33 3.2zM8 15.6l5.33-3.2L8 9.4 2.67 12.4 8 15.6zm8-3.2L8 9.4l-5.33 3.2L8 15.6l5.33-3.2z"/>
    </svg>
);


interface NewContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewContract: (data: {title: string, parties: string[], expiryDate: string, documentUrl?: string}) => void;
}

const NewContractModal: React.FC<NewContractModalProps> = ({ isOpen, onClose, onAddNewContract }) => {
    const [title, setTitle] = useState('');
    const [parties, setParties] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    
    const resetState = () => {
        setTitle('');
        setParties('');
        setExpiryDate('');
        setFile(null);
        setIsAnalyzing(false);
        onClose();
    }

    const handleAnalyze = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        try {
            const { data, mimeType } = await toBase64(file);
            const prompt = `From the attached contract image, extract the main title of the agreement and the parties involved.`;
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { 
                    parts: [
                        { text: prompt },
                        { inlineData: { data, mimeType } }
                    ]
                },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: 'The main title of the agreement.' },
                            parties: { type: Type.STRING, description: 'The parties involved, separated by a comma.' },
                        },
                        required: ["title", "parties"]
                    },
                },
            });

            const resultText = response.text.trim();
            const extractedData = JSON.parse(resultText);

            setTitle(extractedData.title || '');
            setParties(extractedData.parties || '');
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Failed to analyze the document. Please ensure it is a clear image and try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleCreate = () => {
        if (!title || !parties) {
            alert('Please provide a title and parties for the contract.');
            return;
        }
        onAddNewContract({
            title,
            parties: parties.split(',').map(p => p.trim()),
            expiryDate,
            documentUrl: file ? URL.createObjectURL(file) : '#'
        });
        resetState();
    };

    return (
        <ActionModal isOpen={isOpen} onClose={resetState} title="Create New Contract" primaryActionLabel="Create Contract" onPrimaryAction={handleCreate}>
            <div className="space-y-4">
                 <div>
                    <p className="text-center text-sm text-gray-500">Connect from cloud storage</p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                        <button onClick={() => alert('Connecting to Google Drive... (Simulation)')} className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                            <GoogleDriveIcon className="w-5 h-5 mr-2" />
                            Google Drive
                        </button>
                        <button onClick={() => alert('Connecting to Dropbox... (Simulation)')} className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                           <DropboxIcon className="w-5 h-5 mr-2 text-blue-600"/>
                            Dropbox
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-gray-300"></div></div>
                    <div className="relative flex justify-center"><span className="bg-white px-2 text-sm text-gray-500">OR</span></div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload from your computer</label>
                    <div className="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none hover:text-primary-500">
                                <span>{file ? 'Change file' : 'Upload a file'}</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf" ref={fileInputRef} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">Image or PDF up to 10MB</p>
                        </div>
                    </div>
                    {file && (
                        <div className="mt-3 text-center">
                            <p className="text-sm text-gray-700">Selected: <span className="font-medium">{file.name}</span></p>
                            <button onClick={handleAnalyze} disabled={isAnalyzing} className="mt-2 inline-flex items-center text-sm font-semibold px-3 py-1.5 rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400">
                                <SparklesIcon className="w-4 h-4 mr-2"/>
                                {isAnalyzing ? 'Analyzing Document...' : 'Analyze with AI'}
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="border-t pt-4 space-y-4">
                     <div>
                        <label htmlFor="contract-title" className="block text-sm font-medium text-gray-700">Contract Title</label>
                        <input type="text" id="contract-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="e.g., Partnership Agreement" />
                    </div>
                     <div>
                        <label htmlFor="contract-parties" className="block text-sm font-medium text-gray-700">Parties (comma-separated)</label>
                        <input type="text" id="contract-parties" value={parties} onChange={(e) => setParties(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="e.g., Party A, Party B" />
                    </div>
                     <div>
                        <label htmlFor="contract-expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input type="date" id="contract-expiry" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" />
                    </div>
                </div>

            </div>
        </ActionModal>
    );
};

export default NewContractModal;
