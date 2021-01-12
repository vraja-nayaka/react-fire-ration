import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: "100vh",
      backgroundColor: '#ffe',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100px',
    },
    top: {
      color: 'primary',
      animationDuration: '600ms',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100px',
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);

const LoadingScreen = (props: CircularProgressProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={80}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={80}
        thickness={4}
        {...props}
      />
    </div>
  );
};

export default LoadingScreen;
