import { createMuiTheme } from "@material-ui/core";
import { orange, green, lightBlue } from "@material-ui/core/colors";

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
      gradientSuccess2: string;
      gradientSuccess3: string;
      gradientSuccess4: string;
      gradientSuccess5: string;
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
      gradientSuccess2?: string;
      gradientSuccess3?: string;
      gradientSuccess4?: string;
      gradientSuccess5?: string;
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
    gradientSuccess2: green[400],
    gradientSuccess3: lightBlue[400],
    gradientSuccess4: lightBlue[600],
    gradientSuccess5: colors.pink,
  }
});
