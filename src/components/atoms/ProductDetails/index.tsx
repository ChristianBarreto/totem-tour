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
        <p className={styles.paragraph}>
          <div className={`${hidden && styles.hidden}`}><span className='font-bold'>Detalhes: </span> {text}</div>
        </p>
      </div>
      <div className='flex justify-center'> 
        <button
          className='text-blue-600'
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? (
            <button className="btn btn-circle btn-sm btn-outline mt-3 text-neutral-500 animate-pulse">
              <IconChevronDown />
            </button>
          ):(
            <button className="btn btn-circle btn-sm btn-outline text-neutral-500 animate-pulse">
              <IconChevronUp />
            </button>
          )}
        </button>
      </div>

    </div>


  )
}