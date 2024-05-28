import dirTree from 'directory-tree'

import {getDocsFromMd, isDocName, toList} from '../utils'

import type {SearchEngineCommon} from '../engines/basic'

export async function initializedSearchBasic(engine: SearchEngineCommon) {
  // only invoke once when build
  engine.clear()
  const libTree = dirTree('app', {exclude: /home|[id]]/}, undefined, item => {
    return isDocName(item)
  })
  if (!libTree) throw new Error('dirTree is empty')
  const treeList = toList(libTree)

  for (const link of treeList) {
    const docs = await getDocsFromMd(link)
    for (const {title, content, href} of docs) {
      engine.addDoc({href, content, title})
    }
  }
  // engine.save();
}
