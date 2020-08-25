import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    // verificar se o type é diferente aos valores informados
    if(!["income", "outcome"].includes(type)) {
      throw new Error("Transaction types is invalid!")
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === "outcome" && total < value) {
      throw new Error("You do not have enough balance")
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
