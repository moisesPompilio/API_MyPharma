import { uuidIsInvalid } from '../uuidIsInvalid';

describe('uuidIsInvalid function', () => {
  it('should throw an error if uuid is invalid', () => {
    const invalidUuid = 'not-a-uuid';
    expect(() => uuidIsInvalid(invalidUuid, 'id')).toThrowError('invalid id as it is not a uuid');
  });

  it('should not throw an error if uuid is valid', () => {
    const validUuid = 'a5c78a81-94f7-4c1d-a2f2-570f91b30fb8';
    expect(() => uuidIsInvalid(validUuid, 'id')).not.toThrowError();
  });
});
