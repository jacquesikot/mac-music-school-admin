import * as React from 'react';

function ChevronDown(props) {
  return (
    <svg
      width={11}
      height={7}
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1l4.25 4.25L9.5 1"
        stroke="#B0B7C3"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ChevronDown;
