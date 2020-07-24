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

    tittle: {
        position: "relative",
        height: "48px",
        width: "100%",
        top: "10%",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "DM Sans",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "40px",
        lineHeight: "52px"
    },

    graphic: {
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "150px"
    },

    graphic1: {
        width: "40%",
        height: "40%",
    },

}))
