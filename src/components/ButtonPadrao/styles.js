import {
  makeStyles
} from '@material-ui/core'

export const lindo = makeStyles((props) => ({
  butao: {
    color: `${props.cor}`,
    boxShadow: "5px 5px 5px red",
    width: "calc(50% - 10px + 10vw)",

    [props.breakpoints.up("sm")]: {
      backgroundColor: "red",
    },
    [props.breakpoints.down("sm")]: {
      backgroundColor: "yellow",
    },
    [props.breakpoints.down("xs")]: {
      backgroundColor: "green",
    }
  }
}))
