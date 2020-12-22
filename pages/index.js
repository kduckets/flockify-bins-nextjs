import { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import styles from '../styles/Home.module.css'
import Bin from '../components/recordBin.js'
import Nav from '../components/nav.js'


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

    const [sixties_posts, setSixtiesPosts] = useState([]);
    const [seventies_posts, setSeventiesPosts] = useState([]);
    const [eighties_posts, setEightiesPosts] = useState([]);
    const [nineties_posts, setNinetiesPosts] = useState([]);
    const [zeros_posts, setZerosPosts] = useState([]);
    const [tens_posts, setTensPosts] = useState([]);
    const [twenties_posts, setTwentiesPosts] = useState([]);


       
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


        // --------DECADES-----------------
        const sixties_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('1960-1-01', '1969-12-31')){
            sixties_posts[key] = post
       }}
        const shuffled_sixties_posts = knuthShuffle(Object.entries(sixties_posts))
        shuffled_sixties_posts.push('60s')
        setSixtiesPosts(shuffled_sixties_posts)

        const seventies_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('1970-1-01', '1979-12-31')){
          seventies_posts[key] = post
       }}
        const shuffled_seventies_posts = knuthShuffle(Object.entries(seventies_posts))
        shuffled_seventies_posts.push('70s')
        setSeventiesPosts(shuffled_seventies_posts)

        const eighties_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('1980-1-01', '1989-12-31')){
          eighties_posts[key] = post
       }}
        const shuffled_eighties_posts = knuthShuffle(Object.entries(eighties_posts))
        shuffled_eighties_posts.push('80s')
        setEightiesPosts(shuffled_eighties_posts)

        const nineties_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('1990-1-01', '1999-12-31')){
          nineties_posts[key] = post
       }}
        const shuffled_nineties_posts = knuthShuffle(Object.entries(nineties_posts))
        shuffled_nineties_posts.push('90s')
        setNinetiesPosts(shuffled_nineties_posts)

        const zeros_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('2000-1-01', '2009-12-31')){
          zeros_posts[key] = post
       }}
        const shuffled_zeros_posts = knuthShuffle(Object.entries(zeros_posts))
        shuffled_zeros_posts.push('00s')
        setZerosPosts(shuffled_zeros_posts)

        const tens_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('2010-1-01', '2019-12-31')){
          tens_posts[key] = post
       }}
        const shuffled_tens_posts = knuthShuffle(Object.entries(tens_posts))
        shuffled_tens_posts.push('10s')
        setTensPosts(shuffled_tens_posts)

        const twenties_posts = {}
        for (const [key, post] of Object.entries(albums)) {
        if(post.media_info && post.media_info.album && moment(post.media_info.release_date).isBetween('2020-1-01', '2029-12-31')){
          twenties_posts[key] = post
       }}
        const shuffled_twenties_posts = knuthShuffle(Object.entries(twenties_posts))
        shuffled_twenties_posts.push('20s')
        setTwentiesPosts(shuffled_twenties_posts)
      

        
  }

  ,[]);  
 
  return (
    <div className={styles.home}>
      <Head>
        <title>Flockify Bins</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav/>

      <Bin data={twenties_posts}/>

      <Bin data={tens_posts}/>

      <Bin data={zeros_posts}/>

      <Bin data={nineties_posts}/>

      <Bin data={eighties_posts}/>

      <Bin data={seventies_posts}/>

      <Bin data={sixties_posts}/>
      
      {/* <Bin data={rock_posts}/>

      <Bin data={jazz_posts}/>

      <Bin data={funk_posts}/>

      <Bin data={reggae_posts}/>
      
      <Bin data={folk_posts}/> */}


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



