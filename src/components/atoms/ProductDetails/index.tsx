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
      <div>
        <div className={styles.paragraph}>
          <div className={`${hidden && styles.hidden}`}><span className='font-bold'>Detalhes: <br /></span>{text}</div>
          {hidden && <p className='text-sm pt-4 text-center' onClick={() => setHidden(!hidden)} >...mostrar mais</p>}
        </div>
      </div>
      <div className='flex justify-center'> 
        {hidden ? (
          <button
            className="btn btn-circle btn-sm btn-primary text-white mt-3 animate-bounce"
            onClick={() => setHidden(!hidden)}  
          >
            <IconChevronDown />
          </button>
        ):(
          <button
            className="btn btn-circle btn-sm btn-primary text-white animate-bounce"
            onClick={() => setHidden(!hidden)}  
          >
            <IconChevronUp />
          </button>
        )}
      </div>

    </div>


  )
}