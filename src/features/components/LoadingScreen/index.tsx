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
            left: '50%',
            bottom: '50%',
            position: 'absolute',
        },
        top: {
            color: 'primary',
            animationDuration: '600ms',
            position: 'absolute',
            left: '50%',
            bottom: '50%',
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
