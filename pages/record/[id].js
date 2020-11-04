import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Spinner from 'react-bootstrap/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Nav from '../../components/nav.js'
import Grid from '@material-ui/core/Grid';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
  },
});

const Record = (props) => {
  const [record, setRecord] = useState(null);  useEffect(() => {
    fire.database()
        .ref('posts/firsttoflock/' + props.id)
        .once('value')
      .then(result => {
        setRecord(result.val())
      })
  }, []);  

  const classes = useStyles();
  
  if(!record){
    return(
      <div>
      <Nav/>
      <Container>  
      <Spinner animation="grow" variant="info" />
      </Container>
      </div>
    )
  }  return (
    <div>
    <Nav/>
    
    <Grid
        container
        spacing={0}
        width="100%"
        direction="column"
        alignItems="center"
        justify="center"
        >

    <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                scale: .8,
                opacity: 0
                },
                 visible: {
                  scale: 1,
                   opacity: 1,
               transition: {
                   delay: .4
                  }
                  },
              }}>
    <Card>
    <CardActionArea>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="100%"
        image={record.image_medium}
        title="Contemplative Reptile"
        href={"https://flockify.herokuapp.com/#/albums/"+props.id}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {record.media_info.album}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {record.media_info.artist}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>   
    <Button size="small" 
            color="primary" 
            href={"https://duckduckgo.com/?q=!ducky+" + record.media_info.artist.replace(/ /g,"+") + "band+website"}
            target="_blank"
            >
       Buy from Artist
      </Button>
      <Button size="small" color="primary"
      href={"https://duckduckgo.com/?q=!ducky+" + record.media_info.artist.replace(/ /g,"+") +"+" + record.media_info.album.replace(/ /g,"+") + "release+discogs"}
      target="_blank">
        Buy on Discogs
      </Button>
    </CardActions>
  </Card>
  </motion.div>
  </Grid>
  </div>
  )
}
Record.getInitialProps = ({ query }) => {
  return {
      id: query.id,
  }
}
export default Record





