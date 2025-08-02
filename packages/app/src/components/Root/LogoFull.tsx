import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 32,
  },
  path: {
    fill: '#7c3aed',
  },
});

const LogoFull = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      viewBox="0 0 200 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="24"
        className={classes.path}
        fontSize="24"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        AI Studio
      </text>
    </svg>
  );
};

export default LogoFull;