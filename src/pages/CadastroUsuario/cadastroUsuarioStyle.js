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
        flexDirection: "column"
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
        boxShadow: " 0px 0px 50px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px 20px 0px 0px",
        backgroundColor: "#FFFFFF",
    },

    appbar: {
        backgroundColor: "#FFFFFF",
        width: "581px",
    },

    formulario: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        height: "100%",
        borderRadius: "5px",
    },

    allforms: {
        display: "flex",
        flexDIirection: "row",
    },
}));