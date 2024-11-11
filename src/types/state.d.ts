import { Card, Transaction } from '../ApiClient';

export interface State {
  selectedCard: Card | null;
  filterValue: string;
  transactions: Transaction[];
}
