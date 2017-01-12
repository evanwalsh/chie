// @flow

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default class Parser {
  files: string[]

  constructor (files: string[]) {
    this.files = files
  }

  parse (): string {
    return md.render('# OK!')
  }
}
