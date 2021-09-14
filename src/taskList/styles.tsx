import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
createStyles({
    root: {    
      marginTop: 20,
      width: 370,
      color: 'white',
      backgroundColor: '#2740e0',
      marginBottom: 10,
      borderRadius: 20,
      fontWeight:'bolder',
    },
    button: {
      color: 'black',
      backgroundColor: '#cfd0da',
      marginLeft: 15,
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 15,
    },
    search: {
      marginTop: 10,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 370,
      borderRadius: 10,
      backgroundColor: '#dddddd',
    },
    inputSearch: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    description:{
      marginLeft: 15,
      marginRight: 15,
      display: 'flex',
    },
    newBtn:{
      padding: 15,
      marginTop: 100,
      marginLeft: 210,
      borderRadius: 10,
    },   
    tarefas:{
      marginRight: 250,
      marginTop: 30,
      fontSize:'2rem',
      fontWeight:'bolder',
    },    
    subheader:{
      color:'white',
    }
  }),
);
export default useStyle;