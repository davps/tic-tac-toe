describe('test boundary conditions', () => {
  it('should throw because the argument is mandatory on toFailBecause', () => {
    expect(() => {
      expect().toFailBecause();
    }).toThrow();
  });

  it('should throw because the action argument should have a type property', () => {
    expect(() => {
      expect().toFailBecause({});
    }).toThrow();
  });
});

describe('trigger matches on success expectation and failures expectation, both negated and non-negated', () => {
  it('toEqualBecause', () => {
    expect(true).toEqualBecause(true, {
      type: 'Custom toEqualBecause matcher test'
    });

    expect(true).not.toEqualBecause(false, {
      type: 'Custom toEqualBecause matcher test'
    });

    expect(() => {
      expect(true).not.toEqualBecause(true, {
        type: 'Custom toEqualBecause matcher test'
      });
    }).toThrow();

    expect(() => {
      expect(true).toEqualBecause(false, {
        type: 'Custom toEqualBecause matcher test'
      });
    }).toThrow();
  });

  it('toBeDefinedBecause', () => {
    expect(true).toBeDefinedBecause({
      type: 'Custom toBeDefinedBecause matcher test'
    });

    expect(undefined).not.toBeDefinedBecause({
      type: 'Custom toBeDefinedBecause matcher test'
    });

    expect(() => {
      expect(true).not.toBeDefinedBecause({
        type: 'Custom toBeDefinedBecause matcher test'
      });
    }).toThrow();

    expect(() => {
      expect(undefined).toBeDefinedBecause({
        type: 'Custom toBeDefinedBecause matcher test'
      });
    }).toThrow();
  });

  it('toBeNullBecause', () => {
    expect(null).toBeNullBecause({
      type: 'reason'
    });

    expect(() => {
      expect({}).toBeNullBecause({
        type: 'reason'
      });
    }).toThrow();

    expect(() => {
      expect(null).not.toBeNullBecause({
        type: 'reason'
      });
    }).toThrow();

    expect({}).not.toBeNullBecause({
      type: 'reason'
    });
  });

  it('toFailBecause', () => {
    expect(() => {
      expect().toFailBecause({ type: 'Testing toFailBecause not failure' });
    }).toThrow();

    expect().not.toFailBecause({ type: 'Testing toFailBecause not failure' });
  });
});
