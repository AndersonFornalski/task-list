import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
createStyles({
    root: {      
      marginTop:'20px',
      maxWidth: '400px',
      height: '150px',
      color: 'white',
      backgroundColor: '#2740e0',
      marginBottom:'20px',
      borderRadius:'20px',
      fontWeight:'bolder',
    },
    
    button: {
        color: 'black',
        backgroundColor: '#cfd0da',
        marginLeft: '15px',
        borderRadius:'10px',
    },
  }),
);
export default useStyle;