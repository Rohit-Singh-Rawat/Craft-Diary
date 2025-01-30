import * as React from 'react';
import type { SVGProps } from 'react';
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    imageRendering="optimizeQuality"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M407 372H105c-2 0-5-1-6-3L1 215c-1-3-1-6 0-8 2-2 5-3 8-3l246 62 248-62c3 0 6 1 8 3 1 2 1 5 0 8l-98 154c-1 2-4 3-6 3zm-298-14h294l87-136-233 58h-4L22 222l87 136z" />
    <path d="M175 260c-1 0-3 0-4-1-3-2-3-7-1-10l81-106c2-2 4-3 6-3s4 1 5 3l81 105c3 3 2 8-1 10-3 3-7 2-10-1l-75-99-76 100c-1 1-3 2-6 2z" />
    <path d="M257 372c-2 0-4-1-6-3l-81-112c-3-3-2-7 1-9 3-3 8-2 10 1l76 104 75-104c2-4 7-4 10-2s4 7 1 10l-80 112c-2 2-4 3-6 3z" />
  </svg>
);
export default Logo;
