import { createMuiTheme } from "@material-ui/core";
import { orange, purple, green } from "@material-ui/core/colors";

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
        primary: purple,
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
