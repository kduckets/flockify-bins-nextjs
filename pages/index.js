import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import fire from '../config/fire-config';
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";

const Home = () => {
  const [posts, setPosts] = useState([]);  useEffect(() => {
    fire.database()
      .ref('posts/firsttoflock/')
      .limitToLast(100)
      .orderByChild('/tags/0/name')
      .equalTo('Rock')
      .once('value')
      .then(snap => {
        const posts = snap.val()
        setPosts(posts)
      });
  }, []);  

  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? event.delta[0] : 0
      }deg)`
    });
  });
  
  
  return (
    <div>
      <Head>
        <title>Flockify Bins</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

{/* BIN 1       */}
      <div className={styles.container} {...bind()}>
        {Object.entries(posts).map(post => 
              <a href ={"https://flockify.herokuapp.com/#/albums/" + post[0]}
                 target = "_blank"
                 key={post[0]} 
                //  className = {styles.album_title}
                 >
               <animated.div style={style}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>
               </a>     
            
        )}
     
      </div>
      <img src='/flockify.png' className={styles.center}/>
    </div>
 
  )
}

export default Home;



