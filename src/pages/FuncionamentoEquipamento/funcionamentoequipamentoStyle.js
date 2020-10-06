import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        padding: "50px 0 66px 50px",
        paddingTop: "50px",
        paddingRight: "0px",
        paddingBottom: "66px",
        paddingLeft: "50px",
        [theme.breakpoints.only("xs")]: {
            padding: "30px 5% 30px",
            width: "100%",
        },
    },

}))