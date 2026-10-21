class InvalidAmountError extends Error {
  constructor(amount: number) {
    super(`유효하지 않은 금액입니다. ${amount}`);
    this.name = 'InvalidAmountError';
  }
}

export { InvalidAmountError };
