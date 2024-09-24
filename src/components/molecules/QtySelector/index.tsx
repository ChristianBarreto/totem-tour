import React from 'react';
import styles from './QtySelector.module.css';

export default function QtySelector({
  qty,
  setQty,
  maxQty,
  disabled,
}: {
  qty: number,
  setQty: (value: number) => void
  maxQty: number,
  disabled: boolean
}) {
  const handlePlus = () => {
    if (qty < maxQty) {
      setQty(qty + 1)
    }
  }
  const handleMinus = () => {
    if (qty > 0) {
      setQty(qty - 1)
    }
  }
  return (
    <div className="join">
      <button className="btn bg-indigo-600 hover:bg-indigo-400 join-item text-base-100" onClick={handleMinus} disabled={disabled}>
        -
      </button>
      <input className={`join-item border w-16 ${styles.input}`} value={qty} disabled={disabled} />
      <button className="btn bg-indigo-600 hover:bg-indigo-400 join-item text-base-100" onClick={handlePlus} disabled={disabled}>
        +
      </button>
    </div>
  )
}