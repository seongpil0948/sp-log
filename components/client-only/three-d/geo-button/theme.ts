import { tv } from '@nextui-org/theme'

const blushStyle = 'absolute bottom-[-15px] w-[100px] h-[30px] blur-[20px]'
const colorPurple = '#db07d1'
const colorPink = '#f2056f'
const colorBlue = '#61dafb'
const introBtn = tv({
  slots: {
    wrapper: `wrapper flex-center gradient relative px-10 py-2 md:px-20 md:py-5 outline-none border-none rounded-lg md:rounded-full tracking-[-1px]  appearance-none	cursor-pointer`,
    shapes: `shapes absolute inset-x-[-1px] inset-y-[-1px] rounded-[60px] bg-gradient-to-r from-[${colorBlue}] from-0% via-[#d6cbf6] via-40% to-[${colorPink}] to-70%`,
    blushPink: `blushPink ${blushStyle} left-[20px] bg-[${colorPurple}]`,
    blushBlue: `blushBlue ${blushStyle} right-[20px] bg-[${colorBlue}]`,
    container:
      'absolute inset-x-[-100px] inset-y-[-100px] w-[calc(100%+200px)] pointer-events-none',
    canvas: 'absolute w-full h-full max-w-[20vw]',
  },
})
export { introBtn }
