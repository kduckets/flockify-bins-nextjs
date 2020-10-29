import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const Record = (props) => {
  const [record, setRecord] = useState(null);  useEffect(() => {
    fire.database()
        .ref('posts/firsttoflock/' + props.id)
        .once('value')
      .then(result => {
        setRecord(result.val())
      })
  }, []);  


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'absolute',
    height: "100%",
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 320,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));


const classes = useStyles();
  
  if(!record){
    return(
      <Container>
      <Spinner animation="grow" variant="info" />
      </Container>
    )
  }  return (
    
    <div className={classes.root}>
   
        <ButtonBase
          href={"https://duckduckgo.com/?q=!ducky+"+record.media_info.artist.replace(/ /g, '+') + "band+website"}
          target="_blank"
          focusRipple
          key={record.media_info.album}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%',
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${record.image_medium})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {"Buy Record From Artist's Website"}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
       
    </div>
   
  );
}
Record.getInitialProps = ({ query }) => {
  return {
      id: query.id,
  }
}
export default Record





