import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        height: "100vh",
        backgroundColor: "#E5E5E5",
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },

    fullList: {
        width: 'auto',
    },

    appbar: {
        backgroundColor: "#2D64F3"
    },

    sidebar: {
        backgroundColor: "#FE2121",
        position: "absolute",
        width: "64px",
        height: "94vh",
        left: "0px",
        top: "36px",
    },

    graphic: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },

    graphic1: {
        width: "40%",
        height: "40%",
    },

}))
