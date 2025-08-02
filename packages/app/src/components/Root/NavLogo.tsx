import React from 'react';
import { Link, makeStyles } from '@material-ui/core';
import LogoFull from './LogoFull';

const useStyles = makeStyles({
  root: {
    gridArea: 'pageSubheader',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
});

export const NavLogo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link component="button" href="/" underline="none">
        <LogoFull />
      </Link>
    </div>
  );
};