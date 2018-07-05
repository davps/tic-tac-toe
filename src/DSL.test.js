import { Scenario, I } from './DSL';

it('Unit testing boundary conditions of the DSL interpreter', () => {
  expect(() => {
    I.placeMove(0);
  }).toThrow(); // because did not created a scenario yet

  expect(() => {
    Scenario();
  }).toThrow();
});
