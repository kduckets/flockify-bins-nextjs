import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import Bin from '../components/recordBin.js'

function Home({ albums }) {
    // GENERIC MATH FUNCTIONS TODO: move out of index.js ----------------------------------
 
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

    const [rock_posts, setRockPosts] = useState([]);
    const [jazz_posts, setJazzPosts] = useState([]);
    const [funk_posts, setFunkPosts] = useState([]);
    const [reggae_posts, setReggaePosts] = useState([]);
    const [folk_posts, setFolkPosts] = useState([]);
       
  useEffect(() => {


      //TODO: need to foreach these with custom bin genres
      
        const rock_posts = {}
        for (const [key, post] of Object.entries(albums)) {
          if(post.tags){
          post.tags.forEach(tag => {
            if(tag.name.match(/Rock/i) || tag.name.match(/indie/i) || post.media_info.summary.match(/Rock/i)){
              rock_posts[key] = post
            }
          }); 
        }}
        const shuffled_rock_posts = knuthShuffle(Object.entries(rock_posts))
        shuffled_rock_posts.push('Rock')
        setRockPosts(shuffled_rock_posts)

        const jazz_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Jazz/i) || tag.name.match(/Yazz/i || post.media_info.summary.match(/Jazz/i))){
            jazz_posts[key] = post
            }
          });    
       }}
        const shuffled_jazz_posts = knuthShuffle(Object.entries(jazz_posts))
        shuffled_jazz_posts.push('Jazz')
        setJazzPosts(shuffled_jazz_posts)


        const funk_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Funk/i) || post.media_info.summary.match(/Funk/i)){
            funk_posts[key] = post
            }
          });    
       }}
        const shuffled_funk_posts = knuthShuffle(Object.entries(funk_posts))
        shuffled_funk_posts.push('Funk')
        setFunkPosts(shuffled_funk_posts)

        const reggae_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Reggae/i) || post.media_info.summary.match(/Reggae/i)){
            reggae_posts[key] = post
            }
          });    
       }}
        const shuffled_reggae_posts = knuthShuffle(Object.entries(reggae_posts))
        shuffled_reggae_posts.push('Reggae')
        setReggaePosts(shuffled_reggae_posts)

        const folk_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.tags){
        post.tags.forEach(tag => {
          if(tag.name.match(/Folk/i) || post.media_info.summary.match(/Folk/i)){
            folk_posts[key] = post
            }
          });    
       }}
        const shuffled_folk_posts = knuthShuffle(Object.entries(folk_posts))
        shuffled_folk_posts.push('Folk')
        setFolkPosts(shuffled_folk_posts)
  }
  ,[]);  
 
  return (
    <div>
      <Head>
        <title>Flockify Bins</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Bin data={rock_posts}/>

      <Bin data={jazz_posts}/>

      <Bin data={funk_posts}/>

      <Bin data={reggae_posts}/>
      
      <Bin data={folk_posts}/>


      <img src='/flockify.png' className={styles.center}/>
      <div className={styles.footerText}><small >crate_digger beta</small></div>
    </div>
 
  )
}

    export async function getStaticProps() {

          const res = await fetch(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/posts/firsttoflock.json")
          const albums = await res.json()

      return {
         props: {
           albums,
         },
        }
      }

  export default Home;



