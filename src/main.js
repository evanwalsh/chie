// @flow

import Parser from './parser'

const parser = new Parser(['ok'])

console.log('Hey, hi.', parser.parse())
