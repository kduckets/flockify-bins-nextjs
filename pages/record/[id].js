import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'

const Record = (props) => {
  const [record, setRecord] = useState(null);  useEffect(() => {
    fire.database()
        .ref('posts/firsttoflock/' + props.id)
        .once('value')
      .then(result => {
        setRecord(result.val())
      })
  }, []);  
  
  if(!record){
    return(
      <h2>Loading...</h2>
    )
  }  return (
    <div>
      <h2>{record.media_info.album}</h2>
      <p>
        {record.media_info.artist}
      </p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}
Record.getInitialProps = ({ query }) => {
  return {
      id: query.id,
  }
}
export default Record





