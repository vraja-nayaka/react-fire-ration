import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import { Box, Typography } from "@material-ui/core";
import { footerHeight, headerHeight } from "helpers/constatnts";
import { getRandom, inspirationalPhrases } from "helpers/phrases";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: `calc(100vh - ${headerHeight + footerHeight}px)`,
      backgroundColor: "#ffe",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 400 : 700],
      position: "absolute",
      animationDuration: "800ms",
      top: 0,
      left: -40,
    },
    top: {
      color: "primary",
      animationDuration: "600ms",
      position: "absolute",
      top: 0,
      left: -40,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

const LoadingScreen = (props: CircularProgressProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        height={`calc(100vh - ${headerHeight + footerHeight}px)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box marginBottom={5}>
          <Typography variant="h6" align="center" color="textSecondary">
            {getRandom(inspirationalPhrases)}
          </Typography>
        </Box>
        <Box position="relative">
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.bottom}
            size={80}
            thickness={6}
            {...props}
            value={30}
          />
          <CircularProgress
            variant="indeterminate"
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={80}
            thickness={2}
            {...props}
          />
        </Box>
      </Box>
    </div>
  );
};

export default LoadingScreen;
