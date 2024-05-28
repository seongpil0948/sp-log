import ProjectComponent from '@/app/[lang]/project/_components/ProjectComponent'
import commonConfig from '@/config'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

export default async function SSGPage() {
  return (
    <div className=" w-screen h-screen overflow-hidden">
      <ProjectComponent />
    </div>
  )
}
