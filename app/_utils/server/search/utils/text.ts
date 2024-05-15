export function splitContent(markdown: string): {title: string; content: string}[] {
  const regex = /#+\s*(.*?)(?=\n#+\s*|$)/gm
  const titles = markdown.match(regex)
  if (!titles) return []
  const contents = markdown.split(regex).slice(1)
  return titles
    .map((title, index) => {
      // const content = extractKoreanAndEnglishWithUrl(contents[index]);
      return {title, content: contents[index]}
      // return { title: sanitizeText(title), content: sanitizeText(content) };
    })
    .filter(({title, content}) => title.length > 2 && content.length > 10)
}

export function sanitizeText(t?: string): string {
  if (!t) return ''
  t = t.replace(/(\r\n\t|\n|\r\t)/gm, '')
  // remove same words
  t = t
    .split(' ')
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur)
      }
      return acc
    }, [] as string[])
    .join(' ')
    .trim()
  // return t.trim();
  return t
}

// function extractKoreanAndEnglishWithUrl(str: string): string {
//   const koreanNumRegex =
//     /[\uAC00-\uD7A3\u1100-\u11FF가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_-]/;
//   const englishRegex = /[a-zA-Z]/;
//   const urlRegex =
//     /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:[-\;:&=\+\$,\w]+)?)(?:\/[^\s]*)?)/;

//   const chars = str.split("");
//   const filteredChars = chars.filter((char) => {
//     return (
//       koreanNumRegex.test(char) ||
//       englishRegex.test(char) ||
//       urlRegex.test(char.toLowerCase()) || // HTTP, HTTPS 모두 인식
//       /\s/.test(char) // 띄어쓰기 유지
//     );
//   });

//   return filteredChars.join("");
// }
