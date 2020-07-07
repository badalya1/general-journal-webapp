import type { Service, ServiceAddons } from '@feathersjs/feathers';


export enum TransactionType {
  expense = 'expense',
  income = 'income',
  transfer = 'transfer',
}

export enum TransactionStatus {
  uncleared = 'uncleared',
  cleared = 'cleared',
  reconciled = 'reconciled',
}

export interface Id {
  _id: string;
}

export interface AccountData extends Id {
  userId: string;
  name: string;
  icon: string;
  comment: string;
  isHidden: boolean;
  groupId: string;
}

export interface FilterData extends Id {
  Transfers: boolean;
  loans: boolean;
  unclearedTransactions: boolean;
  accounts?: string[];
  categories?: string[];
  tags?: string[];
}

export interface BudgetData extends Id {
  _id: string;
  userId: string;
  period: string;
  startDate: string;
  endDate: string;
  name: string;
  comment: string;
  includeFilter: FilterData;
  excludeFilter: FilterData;
}

export interface CategoryData extends Id {
  userId: string;
  parentId: string;
  name: string;
  icon: string;
}

export interface GroupData extends Id {
  _id: string;
  name: string;
  comment: string;
  parentId: string;
  userId: string;
}

export interface TagData extends Id {
  _id: string;
  parentId: string;
  userId: string;
  name: string;
  icon: string;
}

export interface TransactionData extends Id {
  _id: string;
  userId: string;
  type: TransactionType;
  description: string;
  date: string;
  amount: string;
  souceAccount: string;
  destAccount: string;
  status: TransactionStatus;
  category: string;
  comment: string;
}

export interface UserPreferences {
  [key: string]: unknown;
}

export interface UserData extends Id {
  strategy: 'local' | 'github' | string;
  name: string;
  username: string;
  email: string;
  password: string;
  preferences?: UserPreferences;
}

export type Accounts = Service<AccountData>
export type Budgets = Service<BudgetData>
export type Categories = Service<CategoryData>
export type Groups = Service<GroupData>
export type Tags = Service<TagData>
export type Transactions = Service<TransactionData>
export type Users = Service<UserData>

export interface ServiceTypes {
  accounts: Accounts & ServiceAddons<Accounts>;
  budgets: Budgets & ServiceAddons<Budgets>;
  categories: Categories & ServiceAddons<Categories>;
  groups: Groups & ServiceAddons<Groups>;
  tags: Tags & ServiceAddons<Tags>;
  transactions: Transactions & ServiceAddons<Transactions>;
  users: Users & ServiceAddons<Users>;
}
