import { createMuiTheme } from "@material-ui/core";
import { orange, green } from "@material-ui/core/colors";

const colors = {
  pink: '#c8397a',
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: string;
    };
    background: {
      gradient1: string;
      gradientSuccess: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    background: {
      gradient1?: string;
      gradientSuccess?: string;
    };
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.pink,
      main: colors.pink,
      dark: colors.pink,
      contrastText: '#fff',
    },
    secondary: green,
  },
  status: {
    danger: orange[500],
  },
  background: {
    gradient1: orange[200],
    gradientSuccess: green[200],
  }
});
