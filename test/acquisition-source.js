'use strict';

import test from 'blue-tape';
import parserTest from './parsers';

parserTest();

test('Tests run', (assert) => {
  assert.pass('Tests run');
  assert.end();
});

// test('Greet World', (assert) => {
//   assert.equal(hello('World'), 'Hello, World!');
//   assert.end();
// });
