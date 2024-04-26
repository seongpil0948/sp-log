"use client";
import { renderToString } from "react-dom/server";
import { ExpPage } from "../page";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useCommonCtx } from "@/app/_providers/common";

export function ExperienceDownButton() {
  const router = useRouter();
  const { clientLocale } = useCommonCtx();
  const handlePrint = async () => {
    // html2pdf().set(opt).from(printContent).save();
    // @ts-ignore
    const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
    // const div = document.createElement("div");
    // const root = createRoot(div);
    // flushSync(() => {
    //   root.render(content());
    //   console.log("===> ", div.innerHTML, content());
    //   html2pdf().set().from(div.innerHTML).save();
    // });
    const printContent = renderToString(ExpPage());
    html2pdf()
      .set({
        // margin: 1,
        filename: "seongpil_experience.pdf",
        // image: { type: "jpeg", quality: 0.98 },
        // html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(printContent)
      .save();
  };

  return (
    <>
      <Button onClick={handlePrint}>경력기술서 다운</Button>
      <Button
        onClick={() => {
          router.push(`/${clientLocale}/about/experience`);
        }}
      >
        경력기술서 페이지({clientLocale})
      </Button>
    </>
  );
}
