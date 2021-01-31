import React from "react";
import {
  Box,
  LinearProgress as MiuLinearProgress,
  Typography,
} from "@material-ui/core";
import {
  withStyles,
  lighten,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { theme } from "theme";

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    backgroundColor: lighten(theme.palette.primary.main, 0.5),
  },
  bar: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
  },
})(MiuLinearProgress);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    unselectable: {
      WebkitTouchCallout: "none",
      WebkitUserSelect: "none",
      KhtmlUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    },
  })
);

interface Props {
  percent: number;
  current: number;
  next: number;
}

export const LinearProgress = ({ percent, current, next }: Props) => {
  const classes = useStyles();

  return (
    <Box position="relative">
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={percent}
      />
      <Box position="absolute" width="100%" top="0">
        <Typography
          variant="subtitle2"
          align="center"
          color="textSecondary"
          className={classes.unselectable}
        >
          {current}/{next} EXP
        </Typography>
      </Box>
    </Box>
  );
};
