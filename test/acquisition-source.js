'use strict';

import test from 'tape';
import parserTest from './parsers';

// import acquisitionSource from '../acquisition-source';
parserTest();

test('Tests run', (assert) => {
  assert.pass('Tests run');
  assert.end();
});

// test('Greet World', (assert) => {
//   assert.equal(hello('World'), 'Hello, World!');
//   assert.end();
// });
