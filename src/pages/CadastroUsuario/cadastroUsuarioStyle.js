import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: "absolute",
        height: "85%",
        left: "10%",
        top: "63px",
        display: "flex",
        flexDirection: "column",
    },

    formulariointeiro: {
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
    },

    tittle: {
        position: "absolute",
        width: "956px",
        height: "63px",
        marginTop: "20px",
        fontFamily: "DM Sans",
        fontWeight: "500",
        fontSize: "30px",
        lineHeight: "56px",
        display: "flex",
        alignItems: "center",
        color: "#000000",
    },

    typeuser: {
        color: "#2196F3",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "15px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        // boxShadow: " 0px 0px 50px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px 20px 0px 0px",
        backgroundColor: "#FFFFFF",
    },

    appbar: {
        backgroundColor: "#FFFFFF",
        width: "581px",
    },
    campodeinfo: {
        backgroundColor: "#FFFFFF",
        padding: "10px",

    },

    formulario: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "350px",
        height: "100%",
        borderRadius: "5px",
    },

    formulario2: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "5px",
        minWidth: "350px",
        marginLeft: "88px",
        [theme.breakpoints.down('xs')]: {
            marginLeft: "0px",        }
    },

    botaocadastrar: {

        border: "1px solid rgba(0, 0, 0, 0.12)",
        boxSizing: "border-box",
        borderRadius: "2px",
        marginTop: "10px",
        backgroundColor: "#2196F3",
        margin: "20px",
        padding: "10px",
        paddingLeft: "15px",
        paddingRight: "20px",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0.02em",
        color: "#FFFFFF",

        cursor: "pointer",

    },

    checkbox: {
        width: "350px",
        alignItems: "center",
        marginTop: "17px",
        [theme.breakpoints.down('xs')]: {
            marginTop: "0px"
        }
    },

    allforms: {
        width: "75%",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        padding: "10px",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
            alignItems: "center",
            width: "581px",
        }
    },
}));