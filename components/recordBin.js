import Link from "next/link";
import { Tabs, Tab } from "react-bootstrap";
import styles from '../styles/Home.module.css'
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";


export default function Bin({ data }) {
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
      if(data.length == 0)
        return (
            <div>
                <p>Loading...</p>
            </div>
        )

    return (
 <div>
    <Tabs defaultActiveKey={data[data.length-1]} id="noanim-tab-example" >
        <Tab eventKey={data[data.length-1]} title={data[data.length-1]}>
            <div className={styles.container} {...bind()}>
     
             {data.slice(0,100).map(post => 
               <Link href="/record/[id]" as={'/record/' + post[0]} key={post[0]}>
                 <a>
               <animated.div style={style}>
                <img 
                    src ={post[1] !== undefined? post[1].image_medium : ''} 
                    className = {styles.post}
                />
                </animated.div>    
                </a> 
            </Link>
        )}   
      </div>
      </Tab>
  </Tabs>
        </div>
    )
};
