export enum ContractStatus {
  DRAFT = 'Draft',
  IN_REVIEW = 'In Review',
  APPROVED = 'Approved',
  SIGNED = 'Signed',
  REJECTED = 'Rejected',
  EXPIRED = 'Expired',
}

export enum UserRole {
  // Enterprise Roles
  SUPER_ADMIN = 'Super Admin',
  ORG_ADMIN = 'Org Admin',
  CONTRIBUTOR = 'Contributor',
  VIEWER = 'Viewer',
  // Functional Roles (can be combined with base enterprise roles)
  LEGAL = 'Legal',
  FINANCE = 'Finance',
  REVIEWER = 'Reviewer', // Kept for mapping
}

export interface Tenant {
    id: string;
    name: string;
    plan: 'Free' | 'Pro' | 'Enterprise';
}

export interface User {
  id: string;
  name:string;
  email: string;
  role: UserRole; // Role within the active tenant
  avatarUrl: string;
  tenants: Tenant[];
  activeTenantId: string;
}

export type WorkflowStatus = 'Pending' | 'Approved' | 'Rejected';

export interface WorkflowStep {
  order: number;
  role: UserRole;
  assignee: Pick<User, 'id' | 'name' | 'role'>;
  status: WorkflowStatus;
  comment?: string;
  completedAt?: string;
}

export interface Workflow {
  id: string;
  contractId: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: 'In Progress' | 'Completed' | 'Cancelled' | 'Rejected';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: Pick<User, 'name' | 'role'>;
  action: string;
  details: string;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTo?: PageLink;
}

export interface PageLink {
    page: 'contracts';
    contractId: string;
}

export type ContractRiskLevel = 'Low' | 'Medium' | 'High';

export interface AIInsights {
    summary: string[];
    extractedClauses: { title: string; content: string }[];
    riskLevel: ContractRiskLevel;
}

export interface Contract {
  id: string;
  tenantId: string; // Added for multi-tenancy
  title: string;
  parties: string[];
  expiryDate: string;
  status: ContractStatus;
  version: number;
  lastUpdated: string;
  documentUrl: string;
  workflow?: Workflow;
  auditLog?: AuditLog[];
  aiInsights?: AIInsights;
}

export interface Activity {
  id: string;
  user: Pick<User, 'name' | 'avatarUrl'>;
  action: string;
  target: string;
  timestamp: string;
}

export interface AssistantMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
}

export interface Template {
    id: string;
    title: string;
    description: string;
    category: 'Sales' | 'Legal' | 'HR' | 'Finance';
    usageCount: number;
    author: string;
}

export interface AutomationRecipe {
    id: string;
    title: string;
    description: string;
    trigger: string;
    author: string;
    isEnabled: boolean;
}

export interface Plugin {
    id: string;
    name: string;
    author: string;
    description: string;
    category: 'Workflow' | 'Insights' | 'Integrations' | 'AI Tools';
    version: string;
    isInstalled: boolean;
}

export interface AIProvider {
    id: string;
    name: 'OpenAI' | 'Anthropic' | 'Google Gemini' | 'Custom';
    apiKeyStatus: 'Connected' | 'Not Connected';
    model: string;
}

export interface PartnerIntegration {
    id: string;
    name: 'Salesforce' | 'Slack' | 'Microsoft Teams' | 'DocuSign' | 'Google Drive' | 'Zapier';
    category: 'CRM' | 'Communication' | 'eSign' | 'Storage' | 'Automation';
    description: string;
    isConnected: boolean;
    logoUrl: string;
}

// Phase 7 Types
export type AgentStatus = 'Idle' | 'Active' | 'Paused' | 'Completed' | 'Error';
export type AgentType = 'Renewal' | 'Compliance' | 'Negotiation';

export interface Agent {
    id: string;
    name: string;
    type: AgentType;
    status: AgentStatus;
    assignedContractId: string;
    assignedContractTitle: string;
    lastActivity: string;
    progress: number; // 0-100
}

export interface AIPolicy {
    id: string;
    name: string;
    description: string;
    jurisdiction: 'Global' | 'EU' | 'US';
    isEnabled: boolean;
}

export interface NegotiationMessage {
    id: string;
    sender: 'Buyer' | 'Vendor' | 'System';
    text: string;
    timestamp: string;
}