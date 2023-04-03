import Link from "next/link";
import styles from '../styles/Home.module.css'
import { Tabs, Tab } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { motion } from 'framer-motion';
import { fade, makeStyles } from '@material-ui/core/styles';


export default function Bin({ data }) {

  const useStyles = makeStyles((theme) => ({
    blackTab: {
      color: "white !important",
      backgroundColor: "black !important",
    }
    
  }))
    
    const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
      }));

      const bind = useScroll(event => {
        if(event.direction[0] === 1){
        set({
          transform: `perspective(500px) rotateY(${
            event.scrolling ? event.delta[0] : 0
          }deg)`
        });
      }
      });

      const classes = useStyles();


   
      if(data.length == 0)
        return (
          <Container>
          <Spinner animation="grow" variant="info" />
          </Container>
        )

    return (
 <div>
    <Tabs defaultActiveKey={data[data.length-1]}>
        <Tab eventKey={data[data.length-1]} title={data[data.length-1]} tabClassName={classes.blackTab}>       
            <div className={styles.container} {...bind()}> 
             {data.slice(0,100).map(post => 
              <motion.div initial="hidden" animate="visible" key={post[0]} variants={{
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
               <Link href="/record/[id]" as={'/record/' + post[0]} key={post[0]} target="_blank">
                 <a>
       
               <animated.div style={style}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>    
               
                </a> 
            </Link>
            </motion.div>
        )}   
      </div>
    
      </Tab> 
  </Tabs>
        </div>
    )
};
