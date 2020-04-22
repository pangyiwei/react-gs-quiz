import { createMuiTheme } from "@material-ui/core";
import AppColors from "./appColors";


const theme = createMuiTheme({
    palette: {
        background: {
            paper: AppColors.background
        },
        primary: {
            main: AppColors.blue
        },
        secondary: {
            main: AppColors.tealBlue
        },
        text: {
            primary: "#000"
        }
    },
    typography: {
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        h2: {
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "12px"
        },
        h3: {
            fontSize: "21px",
            fontWeight: 400
        },
        h6: {
            fontSize: "14px",
            fontWeight: 400
        },
        body1: {
            fontSize: "15px",
            fontWeight: 400
        },
        subtitle1: {
            fontSize: "14px",
            fontWeight: 400,
            color: "#99abb4"
        },
        subtitle2: {
            fontSize: "12px",
            fontWeight: 400,
            color: "#99abb4"
        }
    }
});

export default theme;