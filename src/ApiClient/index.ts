import cardsData from './data/cards.json';
import transactionsData from './data/transactions.json';
import { Card } from '../types/card';
import { Transaction } from '../types/transaction';

export async function getCards(): Promise<Card[]> {
  return cardsData;
}

export async function getTransactions(cardId: string): Promise<Transaction[]> {
  const transactions: Record<string, Transaction[]> = transactionsData;

  if (transactions[cardId]) {
    return transactions[cardId];
  }

  return [];
}
