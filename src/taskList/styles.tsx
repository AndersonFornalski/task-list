import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";

const useStyle = makeStyles((theme: Theme) =>
createStyles({
    root: {
      maxWidth: '400px',
      height: '100px',
      color: purple[300],
      backgroundColor: blue[800],
      marginBottom:'20px',
      borderRadius:'30px',
      fontWeight:'bolder'
    },
    
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
  }),
);
export default useStyle;