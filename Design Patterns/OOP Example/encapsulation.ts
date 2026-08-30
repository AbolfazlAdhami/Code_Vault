class BankAccount {
  private _balance: number;

  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }

  // Getter to get balance of the bank account
  public get balance(): number {
    return this._balance;
  }

  // Method Deposit Money
  public deposit(amount: number) {
    if (amount < 0) {
      console.log("Invalid deposit Amount");
    }
    this._balance += amount;
  }

  public withdraw(amount: number) {
    if (amount < 0) {
      console.log("Invalid withdrawal amount");
      return;
    }
    if (this.balance - amount < 0) {
      console.log("Insufficient Funds");
    }
    this._balance -= amount;
  }
}

const myAccount = new BankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);

console.log("Current balanced:", myAccount.balance);
