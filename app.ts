import inquirer from "inquirer";

// Bank Account interface

interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// Bank Account class

class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;
  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  //-------Debit money-------

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`
      );
    } else {
      console.log("Insufficient balance.");
    }
  }

  //-------Credit money-------

  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // $1 fee charged if more than $100 is deposited.
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful. Your Account Balance is $${this.balance}`
    );
  }

  //-------Check Balance-------

  checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
  }
}

// Customer class

class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

// Create bank accounts

const accounts: BankAccount[] = [
  new BankAccount(9936, 500),
  new BankAccount(9937, 700),
  new BankAccount(9938, 1200),
];

// Create Customers

const customers: Customer[] = [
  new Customer("Hamza", "Khan", "Male", 35, 3221114448, accounts[0]),
  new Customer("Marium", "Ali", "Female", 28, 3152223334, accounts[1]),
  new Customer("Haider", "Asghar", "Male", 31, 3007779995, accounts[2]),
];

// Function to interact with bank account

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      type: "number",
      name: "accountNumber",
      message: "Enter your account number:",
    });

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
      const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "Please select an option",
        choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
      });

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount you would like to deposit:",
          });
          customer.account.deposit(depositAmount.amount);
          break;

        case "Withdraw":
          const WithdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount you would like to withdraw:",
          });
          customer.account.withdraw(WithdrawAmount.amount);
          break;
        case "Check Balance":
          customer.account.checkBalance();
          break;
        case "Exit":
          console.log("Logging out...");
          console.log(
            "\n Thank you for using our bank services. Have a great day!"
          );
          return;

        default:
          break;
      }
    } else {
      console.log("Invalid account number. Please try again.");
    }
  } while (true);
}

service();
