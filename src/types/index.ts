export interface User {
  id: string;
  name: string;
  email: string;
  role: 'analyst' | 'manager' | 'auditor' | 'admin';
  avatar?: string;
}

export interface BankStatement {
  id: string;
  accountNo: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  sourceFile: string;
  status: 'unmatched' | 'matched' | 'exception';
  matchedWith?: string[];
}

export interface LedgerEntry {
  id: string;
  glAccount: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  sourceSystem: string;
  status: 'unmatched' | 'matched' | 'exception';
  matchedWith?: string[];
}

export interface MatchRecord {
  id: string;
  bankStatementId: string;
  ledgerEntryId: string;
  matchRule: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Exception {
  id: string;
  transactionId: string;
  type: 'timing_difference' | 'missing_entry' | 'bank_fee' | 'other';
  description: string;
  amount: number;
  note: string;
  assignedTo: string;
  status: 'open' | 'investigating' | 'resolved';
  agingDays: number;
  createdAt: string;
}

export interface AuditTrail {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  entity: string;
  entityId: string;
  oldValue?: any;
  newValue?: any;
}

export interface ReconciliationSummary {
  totalTransactions: number;
  matchedTransactions: number;
  unmatchedTransactions: number;
  exceptions: number;
  autoMatchRate: number;
  pendingApprovals: number;
}