import React from 'react';
import styles from './QtySelector.module.css';

export default function QtySelector({
  qty,
  setQty,
  maxPerRound,
  remaining,
  disabled,
  setMaxRound
}: {
  qty: number,
  setQty: (value: number) => void
  maxPerRound: number,
  remaining: number | undefined,
  disabled: boolean,
  setMaxRound: (value: boolean) => void,
}) {

  const handlePlus = () => {
    if(qty === maxPerRound) {
      setMaxRound(true);
    } 
    if (qty < maxPerRound) {
      if (remaining && (qty < remaining)){
        setQty(qty + 1)
      }
    }
  }

  const handleMinus = () => {
    setMaxRound(false);
    if (qty > 0) {
      setQty(qty - 1)
    }
  }

  return (
    <div className='flex flex-col'>
      <div className="join">
        <button
          className="join-item btn btn-lg bg-indigo-600 hover:bg-indigo-400 text-base-100 disabled:bg-indigo-200"
          onClick={handleMinus}
          disabled={disabled}
        >
          -
        </button>
        <input
          className={`join-item border w-16 disabled:bg-indigo-100
          ${styles.input}`}
          value={qty}
          disabled={disabled}
          readOnly
        />
        <button
          className="btn btn-lg bg-indigo-600 hover:bg-indigo-400 join-item text-base-100 disabled:bg-indigo-200"
          onClick={handlePlus}
          disabled={disabled}
        >
          +
        </button>
      </div>
    </div>

  )
}