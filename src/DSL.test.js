import DSL from './DSL';

const testDSL = new DSL();
const { Scenario } = testDSL;
const I = testDSL.createTestDescription();

it('Unit testing boundary conditions of the DSL processor', () => {
  expect(() => {
    I.placeMove(0);
  }).toThrow(); // because did not created a scenario yet

  expect(() => {
    Scenario();
  }).toThrow();

  expect(() => {
    Scenario('A');
    Scenario('A'); // repeat the scenario
  }).toThrow();
});
