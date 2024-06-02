import { SkeletonCard } from '@/components/server-only/loading/skeletons'
import { Suspense, lazy, memo } from 'react'

import PROJECTS from '../../_logics/projects'

import type { IProject } from '../../types'

interface Props {projects?: IProject[]}

const ProjectCard= lazy(() => import('../ProjectCard'))
function ProjectCardListHorizontal(props: Props) {
  let {projects} = props
  if (!projects) {
    projects = PROJECTS
  }
  
  return (<div className=" flex overflow-auto gap-3 h-full">
    {projects.map((proj, idx) => {
      return (<Suspense key={idx} fallback={<SkeletonCard />} >
        <ProjectCard  p={proj} />
      </Suspense>)
    })}
  </div>)
}

function projPropsAreEqual(prevProps: Props, nextProps: Props) {
  const isEqual = (prevProps.projects?.length ?? 0) === (nextProps.projects?.length ?? 0)
  console.log("isEqual: ", isEqual)
  return isEqual
}

export default memo(ProjectCardListHorizontal, projPropsAreEqual)