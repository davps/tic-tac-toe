import _ from 'underscore';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { printExpected, printReceived, matcherHint } from 'jest-matcher-utils';

configure({ adapter: new Adapter() });

/**
 * I document the issues I found while writing my custom
 * matchers, could be useful for future code maintainance purposes.
 * 
 * I can't use custom jasmine matchers
 * https://jasmine.github.io/2.0/custom_matcher.html
 * directly because the jest
 * integration is likely to have a bug (if I will report that
 * bug in the future or develop a fix to that, I could read
 * the jest-jasmine2/build/jest-expect.js on line 44 for its
 * npm version 20.0.4),
 * it didn't expose the
 * (util, customEqualityTesters) object as documented on
 * the above link and as showed on the code snipped below [1], 
 * so I can't use the
 * original util.equals function inside
 * (https://github.com/jasmine/jasmine/blob/master/src/core/matchers/matchersUtil.js),
 * so I fallback to the jest's
 * expect.extends matcher
 * https://jestjs.io/docs/en/expect#expectextendmatchers
 * and use underscore's isEqual instead of util.equals
 *
 * Related: https://github.com/facebook/jest/issues/2547#issuecomment-346500017
 * 
 *[1] The code below did not work because (util, customEqualityTesters) are undefined and null
  // beforeEach(() => {
  //   const customMatchers = {
  //     toEqualBecause: (util, customEqualityTesters) => {
  //       return {
  //         compare: (actual, expected, expectationName) => {
  //           if (typeof expected === 'undefined') {
  //             expected = '';
  //           }

  //           let result = {};
  //           result.pass = actual === expected; // util.equals(actual, expected, customEqualityTesters);

  //           if (result.pass) {
  //             result.message = `Expected ${actual} tooo be ${expected}`;
  //           } else {
  //             result.message = `Expected ${actual} NOT tooo be ${expected}`;
  //           }

  //           return result;
  //         }
  //       };
  //     }
  //   };

  //   jasmine.addMatchers(customMatchers);
  // });
 */

const assertMandatory = action => {
  if (!action) {
    throw new Error('action argument is mandatory');
  }

  if (!action.type) {
    throw new Error(
      `Invalid action object. It must have a type property. Object:
        ${JSON.stringify(action)}`
    );
  }
};

const printExpectedAction = action =>
  `\non expected type ${printExpected(action.type)}:` +
  `\n${JSON.stringify(action, null, 2)}`;

expect.extend({
  toFailBecause: (received, action) => {
    assertMandatory(action);

    const pass = false;

    /* eslint-disable prefer-template */
    const message = pass
      ? () =>
          matcherHint('.not.toBeNull') +
          `\n\nFailed expectation\n` +
          ` on expected type ${printExpected(action)}`
      : () =>
          matcherHint('.toBeNull') +
          `\n\nFailed expectation\n` +
          printExpectedAction(action);
    // eslint-enable */

    return { message, pass };
  },

  toBeNullBecause: (received, action) => {
    assertMandatory(action);

    const pass = _.isNull(received);

    /* eslint-disable prefer-template */
    const message = pass
      ? () =>
          matcherHint('.not.toBeNullBecause') +
          `\n\nExpected value not to be null.\n` +
          `\nReceived:\n` +
          `  ${printReceived(received)}` +
          printExpectedAction(action)
      : () =>
          matcherHint('.toBeNullBecause') +
          `\n\nExpected value to be null.\n` +
          `\nReceived:\n` +
          `  ${printReceived(received)}` +
          printExpectedAction(action);
    /* eslint-enable */

    return { message, pass };
  },

  toBeDefinedBecause: (received, action) => {
    assertMandatory(action);

    const pass = !_.isUndefined(received);

    /* eslint-disable prefer-template */
    const message = pass
      ? () =>
          matcherHint('.not.toBeDefinedBecause') +
          `\n\nExpected value not to be defined.\n` +
          `\nReceived:\n` +
          `  ${printReceived(received)}` +
          printExpectedAction(action)
      : () =>
          matcherHint('.toBeDefinedBecause') +
          `\n\nExpected value to be defined.\n` +
          `\nReceived:\n` +
          `  ${printReceived(received)}` +
          printExpectedAction(action);
    /* eslint-enable */

    return { message, pass };
  },

  toEqualBecause: (received, expected, action) => {
    assertMandatory(action);

    const pass = _.isEqual(expected, received);

    /* eslint-disable prefer-template */
    const message = pass
      ? () =>
          matcherHint('.not.equalBecause') +
          `\n\nExpected value not to match:\n` +
          `  ${printExpected(expected)}` +
          `\nReceived:\n` +
          `  ${printReceived(received)}` +
          printExpectedAction(action)
      : () =>
          matcherHint('.equalBecause') +
          `\n\nExpected value to match:\n` +
          `  ${printExpected(expected)}` +
          `\nReceived:\n` +
          `  ${printReceived(received)}` +
          printExpectedAction(action);
    /* eslint-enable */

    return { message, pass };
  }
});
