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
}),
);

export default useStyles;
