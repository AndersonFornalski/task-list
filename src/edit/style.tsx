import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',      
    },
    textAlign: 'right',
  },
  error:{
    color:"red",
    marginRight: 10,
  },
}),
);

export default useStyles;