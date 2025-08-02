import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 32,
    height: 32,
  },
  path: {
    fill: '#7c3aed',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" className={classes.path} />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        AI
      </text>
    </svg>
  );
};

export default LogoIcon;