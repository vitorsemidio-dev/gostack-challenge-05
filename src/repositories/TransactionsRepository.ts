import Transaction from '../models/Transaction';
import ICreateTransaction from '../dtos/ICreateTransaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const listIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const listOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const sumIncome = listIncome.reduce((acc, cur) => acc + cur.value, 0);
    const sumOutcome = listOutcome.reduce((acc, cur) => acc + cur.value, 0);

    const total = sumIncome - sumOutcome;

    const balance = { income: sumIncome, outcome: sumOutcome, total };

    return balance;
  }

  public create({ title, value, type }: ICreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
