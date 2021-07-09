import * as React from 'react';

function CheckMark(props) {
  return (
    <svg
      width={100}
      height={100}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={25} cy={25} r={25} fill="#E5F7EF" />
      <path
        d="M34.333 18L21.5 30.833 15.666 25"
        stroke="#38CB89"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckMark;
