import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    avatar:{
      width: theme.spacing(8),
      height: theme.spacing(8),
      fontSize: 80,
      backgroundColor:'#1c35da',
      cursor: 'pointer',
    },
    textAvatar:{
      fontSize: 20,
      marginLeft: 10,
    },
    textAvatar2:{
      marginLeft: 10,
    },
    divider:{
      backgroundColor:'white',
      width: 150,
      marginLeft: 20,
    },
    
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'white',
      boxShadow:'none',
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),      
    },
    menuButton: {
      marginRight: theme.spacing(2),
      fontSize: 30,
      color: 'black',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#1c35da',
      color: 'white', 
    },
    list:{
      textTransform: 'capitalize',
      fontSize: 20,
    },
    icon:{
      fontSize: '4rem',
      marginLeft: 20,
    },
    iconList:{
      marginRight: 30,
      fontSize: 25,
    },
    header:{
       
    },
    drawerHeader: {
      display: 'flex',
      marginTop:'-20px',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

export default useStyles;