import { describe, it, expect } from 'vitest';
import { InvalidAmountError } from './errors';

describe('InvalidAmountError', () => {
  it('Error를 상속하고 name이 설정된다', () => {
    const err = new InvalidAmountError(-1);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(InvalidAmountError);
    expect(err.name).toBe('InvalidAmountError');
  });

  it('메시지에 잘못된 금액이 포함된다', () => {
    expect(new InvalidAmountError(-1).message).toContain('-1');
  });
});
