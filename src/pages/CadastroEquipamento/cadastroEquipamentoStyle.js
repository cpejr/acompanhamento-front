import { makeStyles } from '@material-ui/core'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: "absolute",
        height: "85%",
        left: isMobile ? "0%" : "10%",
        top: "63px",
        display: "flex",
        alignItems: isMobile ? "center" : "",
        flexDirection: "column",
    },

    formulariointeiro: {
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
    },

    tittle: {
        position: "absolute",
        width: isMobile ? "100%" : "956px",
        height: "63px",
        marginTop: "20px",
        fontFamily: "DM Sans",
        fontWeight: "500",
        fontSize: "30px",
        justifyContent: isMobile ? "center" : "",
        lineHeight: "40px",
        display: "flex",
        alignItems: "center",
        textAlign: isMobile ? "center" : "",
        color: "#000000",
    },

    novoequipamento: {
        color: "#2196F3",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "15px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        backgroundColor: "#FFFFFF",
    },

    appbar: {
        backgroundColor: "#FFFFFF",
        width: isMobile ? "330px" : "180px",
        marginTop: isMobile ? "20px" : "",
    },
    campodeinfo: {
        backgroundColor: "#FFFFFF",
        padding: "10px",
        width: isMobile ?  "70%" :"100%",
    },

    formulario: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "100%" : "40%",
        alignItems: isMobile ? "center" : "",
        // minWidth: "350px",
        height: "100%",
        borderRadius: "5px",
    },
 
    allforms: {
      width: isMobile ? "400px" : "75%",
      backgroundColor: "#FFFFFF",
      marginBottom: "40px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "",
      padding: "10px",
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


}))
