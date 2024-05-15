'use client'
// import { renderToString } from "react-dom/server";
import {useCommonCtx} from '@/app/_providers/common'

import {Button} from '@nextui-org/button'
import clsx from 'clsx'
import {useRouter} from 'next/navigation'

export function ExperienceDownButton() {
  const router = useRouter()
  const {clientLocale} = useCommonCtx()

  const handlePrint = async (isResume = false) => {
    // html2pdf().set(opt).from(printContent).save();
    // @ts-ignore
    // const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
    // const div = document.createElement("div");
    // const root = createRoot(div);
    // flushSync(() => {
    //   root.render(content());
    //   console.log("===> ", div.innerHTML, content());
    //   html2pdf().set().from(div.innerHTML).save();
    // });
    // const printContent = renderToString(ExpPage());
    // html2pdf()
    //   .set({
    //     // margin: 1,
    //     filename: "seongpil_experience.pdf",
    //     // image: { type: "jpeg", quality: 0.98 },
    //     // html2canvas: { scale: 2 },
    //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //   })
    //   .from(printContent)
    //   .save();

    const a = document.createElement('a')
    if (isResume) {
      a.href = '/resume/Cover-Ko-v3.pdf'
      a.download = 'seongpil_resume.pdf'
    } else {
      a.href = '/resume/experience.pdf'
      a.download = 'seongpil_experience.pdf'
    }
    a.click()
  }
  const btnCls = clsx('min-w-[10rem] max-w-[50vw]')

  return (
    <div className="max-w-[50vw] flex gap-3 flex-wrap overflow-hidden">
      <Button className={btnCls} size="lg" onClick={() => handlePrint(false)}>
        경력기술서 다운
      </Button>
      <Button className={btnCls} size="lg" onClick={() => handlePrint(true)}>
        이력서 다운
      </Button>
      <Button
        className={btnCls}
        size="lg"
        onClick={() => {
          router.push(`/${clientLocale}/about/experience`)
        }}
      >
        경력기술서 페이지({clientLocale})
      </Button>
    </div>
  )
}
