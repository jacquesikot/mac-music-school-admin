import * as React from 'react';

function FormIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path opacity={0.01} fill="#C1C7D0" d="M0 0h24v24H0z" />
      <path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.714 12c0-2.84 1.005-5.265 3.013-7.273S9.16 1.714 12 1.714s5.265 1.005 7.273 3.013C21.282 6.735 22.286 9.16 22.286 12s-1.004 5.265-3.013 7.273c-2.008 2.009-4.433 3.013-7.273 3.013s-5.265-1.004-7.273-3.013C2.719 17.265 1.714 14.84 1.714 12z"
        fill="#C1C7D0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.165 14.566a.999.999 0 111.662-1.109c1.155 1.734 2.519 2.552 4.163 2.552 1.644 0 3.008-.819 4.163-2.552a.999.999 0 011.662 1.108c-1.508 2.263-3.474 3.442-5.829 3.442-2.354 0-4.317-1.18-5.821-3.442z"
        fill="#C1C7D0"
      />
    </svg>
  );
}

export default FormIcon;
