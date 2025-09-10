import { BankStatement, LedgerEntry, Exception, AuditTrail, MatchRecord } from '../types';

export const mockBankStatements: BankStatement[] = [
  {
    id: 'bs-001',
    accountNo: '1234567890',
    date: '2024-01-15',
    description: 'PAYMENT FROM ACME CORP',
    amount: 15000.00,
    currency: 'USD',
    sourceFile: 'bank_statement_jan_2024.csv',
    status: 'matched',
    matchedWith: ['le-001']
  },
  {
    id: 'bs-002',
    accountNo: '1234567890',
    date: '2024-01-16',
    description: 'BANK FEE - WIRE TRANSFER',
    amount: -25.00,
    currency: 'USD',
    sourceFile: 'bank_statement_jan_2024.csv',
    status: 'exception'
  },
  {
    id: 'bs-003',
    accountNo: '1234567890',
    date: '2024-01-17',
    description: 'VENDOR PAYMENT - SUPPLIES',
    amount: -2500.00,
    currency: 'USD',
    sourceFile: 'bank_statement_jan_2024.csv',
    status: 'unmatched'
  },
  {
    id: 'bs-004',
    accountNo: '1234567890',
    date: '2024-01-18',
    description: 'CUSTOMER PAYMENT - INV #12345',
    amount: 8750.00,
    currency: 'USD',
    sourceFile: 'bank_statement_jan_2024.csv',
    status: 'matched',
    matchedWith: ['le-003']
  },
  {
    id: 'bs-005',
    accountNo: '1234567890',
    date: '2024-01-19',
    description: 'PAYROLL TRANSFER',
    amount: -45000.00,
    currency: 'USD',
    sourceFile: 'bank_statement_jan_2024.csv',
    status: 'unmatched'
  }
];

export const mockLedgerEntries: LedgerEntry[] = [
  {
    id: 'le-001',
    glAccount: '1110-CASH',
    date: '2024-01-15',
    description: 'ACME CORP PAYMENT',
    amount: 15000.00,
    currency: 'USD',
    sourceSystem: 'ERP-SAP',
    status: 'matched',
    matchedWith: ['bs-001']
  },
  {
    id: 'le-002',
    glAccount: '1110-CASH',
    date: '2024-01-17',
    description: 'OFFICE SUPPLIES PAYMENT',
    amount: -2450.00,
    currency: 'USD',
    sourceSystem: 'ERP-SAP',
    status: 'unmatched'
  },
  {
    id: 'le-003',
    glAccount: '1110-CASH',
    date: '2024-01-18',
    description: 'CUSTOMER PAYMENT INV #12345',
    amount: 8750.00,
    currency: 'USD',
    sourceSystem: 'ERP-SAP',
    status: 'matched',
    matchedWith: ['bs-004']
  },
  {
    id: 'le-004',
    glAccount: '1110-CASH',
    date: '2024-01-19',
    description: 'PAYROLL - JANUARY 2024',
    amount: -45000.00,
    currency: 'USD',
    sourceSystem: 'ERP-SAP',
    status: 'unmatched'
  },
  {
    id: 'le-005',
    glAccount: '1110-CASH',
    date: '2024-01-20',
    description: 'RENT PAYMENT',
    amount: -5000.00,
    currency: 'USD',
    sourceSystem: 'ERP-SAP',
    status: 'unmatched'
  }
];

export const mockExceptions: Exception[] = [
  {
    id: 'ex-001',
    transactionId: 'bs-002',
    type: 'bank_fee',
    description: 'Bank fee - wire transfer',
    amount: -25.00,
    note: 'Unexpected bank fee, need to verify with bank',
    assignedTo: 'Sarah Johnson',
    status: 'investigating',
    agingDays: 5,
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'ex-002',
    transactionId: 'bs-003',
    type: 'timing_difference',
    description: 'Vendor payment timing difference',
    amount: -2500.00,
    note: 'Amount differs by $50, likely timing issue',
    assignedTo: 'Sarah Johnson',
    status: 'open',
    agingDays: 3,
    createdAt: '2024-01-17T14:30:00Z'
  },
  {
    id: 'ex-003',
    transactionId: 'le-005',
    type: 'missing_entry',
    description: 'Missing bank entry for rent payment',
    amount: -5000.00,
    note: 'ERP shows payment but no corresponding bank transaction',
    assignedTo: 'Sarah Johnson',
    status: 'open',
    agingDays: 1,
    createdAt: '2024-01-20T09:15:00Z'
  }
];

export const mockAuditTrail: AuditTrail[] = [
  {
    id: 'at-001',
    userId: '1',
    action: 'MATCH_CREATED',
    timestamp: '2024-01-15T11:00:00Z',
    entity: 'MatchRecord',
    entityId: 'mr-001',
    newValue: { bankStatementId: 'bs-001', ledgerEntryId: 'le-001', matchRule: 'exact_match' }
  },
  {
    id: 'at-002',
    userId: '2',
    action: 'MATCH_APPROVED',
    timestamp: '2024-01-15T15:30:00Z',
    entity: 'MatchRecord',
    entityId: 'mr-001',
    oldValue: { status: 'pending' },
    newValue: { status: 'approved' }
  },
  {
    id: 'at-003',
    userId: '1',
    action: 'EXCEPTION_CREATED',
    timestamp: '2024-01-16T10:00:00Z',
    entity: 'Exception',
    entityId: 'ex-001',
    newValue: { type: 'bank_fee', assignedTo: 'Sarah Johnson' }
  }
];

export const mockMatchRecords: MatchRecord[] = [
  {
    id: 'mr-001',
    bankStatementId: 'bs-001',
    ledgerEntryId: 'le-001',
    matchRule: 'exact_match',
    status: 'approved',
    createdBy: '1',
    createdAt: '2024-01-15T11:00:00Z',
    approvedBy: '2',
    approvedAt: '2024-01-15T15:30:00Z'
  },
  {
    id: 'mr-002',
    bankStatementId: 'bs-004',
    ledgerEntryId: 'le-003',
    matchRule: 'exact_match',
    status: 'pending',
    createdBy: '1',
    createdAt: '2024-01-18T12:00:00Z'
  }
];