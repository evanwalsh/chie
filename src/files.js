// @flow

import glob from 'glob'

const FILE_PATTERN: string = '**/*.{md,markdown,txt}'

const Files = {
  all: async function () {
    const {err, files} = await glob(FILE_PATTERN)

    if (err) {
      console.error(err)
    }

    return files
  }
}

export default Files
