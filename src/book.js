// @flow

import toml from 'toml'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import MarkdownIt from 'markdown-it'
import nunjucks from 'nunjucks'

nunjucks.configure({ autoescape: false })

export default class Book {
  location: string
  config: Object
  source: string
  parsedSource: string
  html: string

  constructor (location: string) {
    this.location = location
    this.readConfig()
  }

  async build () {
    await this.parse()

    const layoutPath = path.join(__dirname, 'templates', 'layout.html')
    const stylesPath = path.join(__dirname, 'templates', 'book.css')
    const layout = fs.readFileSync(layoutPath, 'utf8')
    const styles = fs.readFileSync(stylesPath, 'utf8')
    const {config} = this

    this.html = nunjucks.renderString(layout, {
      ...config,
      content: this.parsedSource,
      styles
    })
  }

  async write (directory: string) {
    if (!this.html) {
      await this.build()
    }

    if (!directory) {
      directory = this.config.output
    }

    const filename = path.join(directory, 'book.html')

    console.log(filename)

    return new Promise((resolve, reject) => {
      fs.writeFile(filename, this.html, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(filename)
        }
      })
    })
  }

  async parse () {
    this.source = await this.readSource()
    this.parsedSource = await this.parseSource()
  }

  async readConfig () {
    let configPath = path.join(this.location, 'book.toml')
    let rawConfig = fs.readFileSync(configPath, 'utf8')

    this.config = toml.parse(rawConfig)
  }

  globSource (): Promise<string[]> {
    const filePattern = '**/*.{md,markdown,txt}'

    return new Promise((resolve, reject) => {
      glob(path.join(this.location, filePattern), (err, matches) => {
        if (err) {
          reject(err)
        } else {
          resolve(matches)
        }
      })
    })
  }

  async readSource () {
    const matches = await this.globSource()
    const reads = matches.map((name) => fs.readFileSync(name, 'utf8'))

    return reads.join('\n\n')
  }

  async parseSource () {
    const md = new MarkdownIt()
    return md.render(this.source)
  }
}
