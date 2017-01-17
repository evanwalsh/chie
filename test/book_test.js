import test from 'tape'
import path from 'path'
import fs from 'fs'
import tmp from 'tmp'
import Book from '../src/book'

const bookPath = path.join(__dirname, './book')
const book = new Book(bookPath)
const tempDir = tmp.dirSync({ mode: 750, prefix: 'chie_' })

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
      assert.end()
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

test('Book can inline the template CSS when creating the HTML', (assert) => {
  const styles = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'templates', 'book.css'),
    'utf8')

  book.build()
    .then(() => {
      assert.ok(book.html.includes(styles))
      assert.end()
    })
    .catch((e) => {
      assert.fail(JSON.stringify(e))
      assert.end()
    })
})

test('Book can write the HTML to a file', (assert) => {
  book.write(tempDir.name)
    .then((filename) => {
      const html = fs.readFileSync(filename, 'utf8')
      assert.ok(html, 'HTML not OK')
      assert.end()
    })
    .catch((e) => {
      assert.fail(JSON.stringify(e))
      assert.end()
    })
})
