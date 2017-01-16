import test from 'tape'
import path from 'path'
import Book from '../src/book'

const book = new Book(path.join(__dirname, './book'))

test('Book can be created', (assert) => {
  assert.equal(typeof book, 'object')
  assert.end()
})

test('Book can read the config', (assert) => {
  assert.equal(typeof book.config, 'object')
  assert.equal(typeof book.config.title, 'string')
  assert.equal(typeof book.config.author, 'string')
  assert.end()
})

test('Book can convert the source into HTML', (assert) => {
  book.parse()
    .then(() => {
      assert.equal(typeof book.source, 'string')
      assert.equal(typeof book.parsedSource, 'string')
      assert.end()
    })
    .catch((e) => {
      assert.fail(JSON.stringify(e))
    })
})

test('Book can create a full HTML layout', (assert) => {
  book.build()
    .then(() => {
      assert.equal(typeof book.html, 'string')
      assert.end()
    })
    .catch((e) => {
      assert.fail(JSON.stringify(e))
    })
})
