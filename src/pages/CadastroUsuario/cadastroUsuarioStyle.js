import { makeStyles } from '@material-ui/core'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);


export const useStyles = makeStyles((theme) => ({
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

    formulariointeiro: {
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
    },

    tittle: {
        position: "relative",
        fontFamily: "DM Sans",
        fontWeight: "500",
        fontSize: "30px",
        lineHeight: "40px",
        display: "flex",
        textAlign: isMobile ? "center" : "",
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

    select: {
        marginTop: "40px",
        width: "100%",
        height: "100%",
        fontFamily: "Roboto",
        alignItems: "center",
        textAlign: "center",
        color: "#4F8DB5",
        textDecoration: "none"
    },

    cabecario: {
        display: "flex",
        flexDirection: "row",
        width: "956px",
      },

    allforms: {
        width: "75%",
        backgroundColor: "#FFFFFF",
        marginBottom: "40px",
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
