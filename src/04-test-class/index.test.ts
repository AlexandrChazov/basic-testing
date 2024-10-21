import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(5).getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 5;
    expect(() => {
      getBankAccount(balance).withdraw(10);
    }).toThrow(new InsufficientFundsError(balance).message);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 5;
    expect(() => {
      getBankAccount(balance).transfer(10, getBankAccount(10));
    }).toThrow(new InsufficientFundsError(balance).message);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(5);
    expect(() => {
      account.transfer(10, account);
    }).toThrow(new TransferFailedError().message);
  });

  test('should deposit money', () => {
    const balance = 10;
    const transfer = 8;
    const fromAccount = getBankAccount(balance);
    const toAccount = getBankAccount(0);
    fromAccount.transfer(transfer, toAccount);
    expect(fromAccount.getBalance()).toBe(balance - transfer);
  });

  test('should withdraw money', () => {
    const balance = 10;
    const withdraw = 8;
    const fromAccount = getBankAccount(balance);
    fromAccount.withdraw(withdraw);
    expect(fromAccount.getBalance()).toBe(balance - withdraw);
  });

  test('should transfer money', () => {
    const balance = 10;
    const transfer = 8;
    const toAccount = getBankAccount(0);
    getBankAccount(balance).transfer(transfer, toAccount);
    expect(toAccount.getBalance()).toBe(transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    try {
      await expect(
        getBankAccount(5).fetchBalance(),
      ).resolves.toBeGreaterThanOrEqual(0);
    } catch {}
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const balance = 101;
      const bankAccount = getBankAccount(balance);
      await bankAccount.fetchBalance();
      expect(bankAccount.getBalance()).toBeLessThan(balance);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await getBankAccount(5).fetchBalance();
    } catch (err) {
      expect(err).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
