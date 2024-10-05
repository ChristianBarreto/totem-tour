import { useState } from 'react';
import styles from './ProductDetails.module.css';
import IconChevronDown from '../IconChevronDown';
import IconChevronUp from '../IconChevronUp';

export default function ProductDetails({
  text
}:{
  text: string
}) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className={`${styles.container}`}>
      <div >
        <div className={styles.paragraph}>
          <div className={`${hidden && styles.hidden}`}><span className='font-bold'>Detalhes: </span> {text}</div>
        </div>
      </div>
      <div className='flex justify-center'> 
        {hidden ? (
          <button
            className="btn btn-circle btn-sm btn-outline mt-3 text-neutral-500 animate-bounce"
            onClick={() => setHidden(!hidden)}  
          >
            <IconChevronDown />
          </button>
        ):(
          <button
            className="btn btn-circle btn-sm btn-outline text-neutral-500 animate-bounce"
            onClick={() => setHidden(!hidden)}  
          >
            <IconChevronUp />
          </button>
        )}
      </div>

    </div>


  )
}