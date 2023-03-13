import { SVGProps } from 'react';

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   width='24'
    //   height='24'
    //   viewBox='0 0 24 24'
    //   fill='none'
    //   stroke='currentColor'
    //   stroke-width='2'
    //   stroke-linecap='round'
    //   stroke-linejoin='round'
    //   {...props}
    // >
    //   <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
    //   <polyline points='22 4 12 14.01 9 11.01'></polyline>
    // </svg>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 6 9 17 4 12'></polyline>
    </svg>
  );
}