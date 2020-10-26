import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import fire from '../config/fire-config';
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import { Tabs, Tab } from "react-bootstrap";
import Link from 'next/link';

const Home = () => {
  const [rock_posts, setRockPosts] = useState([]);
  const [jazz_posts, setJazzPosts] = useState([]);
  const [funk_posts, setFunkPosts] = useState([]);
  const [reggae_posts, setReggaePosts] = useState([]);
  const [folk_posts, setFolkPosts] = useState([]);

    // GENERIC FUNCTIONS TODO: move out of index.js ----------------------------------
 
    // enumFromTo :: Int -> Int -> [Int]
    const enumFromTo = (m, n) =>
        n >= m ? (
            iterateUntil(x => x >= n, x => 1 + x, m)
        ) : [];
 
    // iterateUntil :: (a -> Bool) -> (a -> a) -> a -> [a]
    const iterateUntil = (p, f, x) => {
        let vs = [x],
            h = x;
        while (!p(h))(h = f(h), vs.push(h));
        return vs;
    };
 
    // randomRInt :: Int -> Int -> Int
    const randomRInt = (low, high) =>
        low + Math.floor(
            (Math.random() * ((high - low) + 1))
        );

  const knuthShuffle = xs =>
  enumFromTo(0, xs.length - 1)
  .reduceRight((a, i) => {
      const
          iRand =  randomRInt(0, i),
          tmp = a[iRand];
      return iRand !== i ? (
          a[iRand] = a[i],
          a[i] = tmp,
          a
      ) : a;
  }, xs);

    // END GENERIC FUNCTIONS TODO: move out of index.js ----------------------------------

    const [style, set] = useSpring(() => ({
      transform: "perspective(500px) rotateY(0deg)"
    }));
  
    const [style2, set2] = useSpring(() => ({
      transform: "perspective(500px) rotateY(0deg)"
    }));
  
    const [style3, set3] = useSpring(() => ({
      transform: "perspective(500px) rotateY(0deg)"
    }));
  
    const [style4, set4] = useSpring(() => ({
      transform: "perspective(500px) rotateY(0deg)"
    }));
  
    const [style5, set5] = useSpring(() => ({
      transform: "perspective(500px) rotateY(0deg)"
    }));
  
    const bind = useScroll(event => {
      set({
        transform: `perspective(500px) rotateY(${
          event.scrolling ? event.delta[0] : 0
        }deg)`
      });
    });
  
    const bind2 = useScroll(event => {
      set2({
        transform: `perspective(500px) rotateY(${
          event.scrolling ? event.delta[0] : 0
        }deg)`
      });
    });
  
    const bind3 = useScroll(event => {
      set3({
        transform: `perspective(500px) rotateY(${
          event.scrolling ? event.delta[0] : 0
        }deg)`
      });
    });
  
    const bind4 = useScroll(event => {
      set4({
        transform: `perspective(500px) rotateY(${
          event.scrolling ? event.delta[0] : 0
        }deg)`
      });
    });
  
    const bind5 = useScroll(event => {
      set5({
        transform: `perspective(500px) rotateY(${
          event.scrolling ? event.delta[0] : 0
        }deg)`
      });
    });

  const [posts, setPosts] = useState([]);  useEffect(() => {
    fire.database()
      .ref('posts/firsttoflock/')
      .orderByChild('media_info/album')
      .once('value')
      .then(snap => {
        const posts = snap.val()
        setPosts(posts) 


      //TODO: need to foreach these
      
        const rock_posts = {}
        for (const [key, post] of Object.entries(posts)) {
          if(post.tags){
          post.tags.forEach(tag => {
            if(tag.name.match(/Rock/i) || tag.name.match(/indie/i) || post.media_info.summary.match(/Rock/i)){
              rock_posts[key] = post
            }
          }); 
        }}
        const shuffled_rock_posts = knuthShuffle(Object.entries(rock_posts))
        setRockPosts(shuffled_rock_posts)

        const jazz_posts = {}
        for (const [key, post] of Object.entries(posts)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Jazz/i) || tag.name.match(/Yazz/i || post.media_info.summary.match(/Jazz/i))){
            jazz_posts[key] = post
            }
          });    
       }}
        const shuffled_jazz_posts = knuthShuffle(Object.entries(jazz_posts))
        setJazzPosts(shuffled_jazz_posts)


        const funk_posts = {}
        for (const [key, post] of Object.entries(posts)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Funk/i) || post.media_info.summary.match(/Funk/i)){
            funk_posts[key] = post
            }
          });    
       }}
        const shuffled_funk_posts = knuthShuffle(Object.entries(funk_posts))
        setFunkPosts(shuffled_funk_posts)

        const reggae_posts = {}
        for (const [key, post] of Object.entries(posts)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Reggae/i) || post.media_info.summary.match(/Reggae/i)){
            reggae_posts[key] = post
            }
          });    
       }}
        const shuffled_reggae_posts = knuthShuffle(Object.entries(reggae_posts))
        setReggaePosts(shuffled_reggae_posts)

        const folk_posts = {}
        for (const [key, post] of Object.entries(posts)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Folk/i) || post.media_info.summary.match(/Folk/i)){
            folk_posts[key] = post
            }
          });    
       }}
        const shuffled_folk_posts = knuthShuffle(Object.entries(folk_posts))
        setFolkPosts(shuffled_folk_posts)




      } );
  }, []);  


  
  return (
    <div>
      <Head>
        <title>Flockify Bins</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


{/* BIN 1       */}
<Tabs defaultActiveKey="rock" id="noanim-tab-example" >
  <Tab eventKey="rock" title="Rock">
      <div className={styles.container} {...bind()}>
     
        {rock_posts.slice(0,100).map(post => 
               <Link href="/record/[id]" as={'/record/' + post[0]} key={post[0]}>
               <animated.div style={style}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>     
               </Link>
        )}   
      </div>
      </Tab>
  </Tabs>


  {/* BIN 2     */}
<Tabs defaultActiveKey="jazz" id="noanim-tab-example" >
  <Tab eventKey="jazz" title="Jazz" >
      <div className={styles.container} {...bind2()}>
     
        {jazz_posts.map(post => 
              <a href ={"https://flockify.herokuapp.com/#/albums/" + post[0]}
                 target = "_blank"
                 key={post[0]} 
                //  className = {styles.album_title}
                 >
               <animated.div style={style2}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>
               </a>      
        )}   
      </div>
      </Tab>
  </Tabs>


    {/* BIN 3     */}
<Tabs defaultActiveKey="funk" id="noanim-tab-example" >
  <Tab eventKey="funk" title="Funk" >
      <div className={styles.container} {...bind3()}>
     
        {funk_posts.map(post => 
              <a href ={"https://flockify.herokuapp.com/#/albums/" + post[0]}
                 target = "_blank"
                 key={post[0]} 
                //  className = {styles.album_title}
                 >
               <animated.div style={style3}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>
               </a>      
        )}   
      </div>
      </Tab>
  </Tabs>


      {/* BIN 4    */}
<Tabs defaultActiveKey="reggae" id="noanim-tab-example" >
  <Tab eventKey="reggae" title="Reggae" >
      <div className={styles.container} {...bind4()}>
     
        {reggae_posts.map(post => 
              <a href ={"https://flockify.herokuapp.com/#/albums/" + post[0]}
                 target = "_blank"
                 key={post[0]} 
                //  className = {styles.album_title}
                 >
               <animated.div style={style4}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>
               </a>      
        )}   
      </div>
      </Tab>
  </Tabs>


      {/* BIN 5    */}
<Tabs defaultActiveKey="folk" id="noanim-tab-example" >
  <Tab eventKey="folk" title="Folk" >
      <div className={styles.container} {...bind5()}>
     
        {folk_posts.map(post => 
              <a href ={"https://flockify.herokuapp.com/#/albums/" + post[0]}
                 target = "_blank"
                 key={post[0]} 
                //  className = {styles.album_title}
                 >
               <animated.div style={style5}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>
               </a>      
        )}   
      </div>
      </Tab>
  </Tabs>


      <img src='/flockify.png' className={styles.center}/>
      <div className={styles.footerText}><small >crate_digger beta</small></div>
    </div>
 
  )
}

export default Home;



