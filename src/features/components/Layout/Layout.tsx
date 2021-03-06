import React from "react";
import { SuspenseWithPerf } from "reactfire";
import {
  Grid,
  Container,
  CssBaseline,
  Box,
  makeStyles,
} from "@material-ui/core";
import LoadingScreen from "features/components/LoadingScreen";
import { footerHeight, headerHeight } from "helpers/constatnts";

interface LayoutPrors {
  header: React.ReactNode;
  navbar: React.ReactNode;
  content: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    marginTop: headerHeight,
    maxHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
    overflowY: "auto",
  },
  nav: {
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100vw",
    zIndex: 1,
  },
});

const Layout = ({ header, navbar, content }: LayoutPrors) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" disableGutters>
        <SuspenseWithPerf
          fallback={<LoadingScreen />}
          traceId={"connecting-to-firebase"}
        >
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              {header}
            </Grid>
            <Grid item xs={12}>
              <Box
                maxHeight="calc(100vh-134px)"
              >
                {content}
              </Box>
            </Grid>
          </Grid>
          <Grid className={classes.nav}>{navbar}</Grid>
        </SuspenseWithPerf>
      </Container>
    </>
  );
};

export default Layout;
