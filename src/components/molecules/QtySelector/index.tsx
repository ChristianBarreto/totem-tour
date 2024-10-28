import React from 'react';
import styles from './QtySelector.module.css';

export default function QtySelector({
  qty,
  setQty,
  qtyAdult,
  setQtyAdult,
  qtyFree,
  setQtyFree,
  qtyHalf,
  setQtyHalf,
  maxPerRound,
  remaining,
  disabled,
  setMaxRound,
  isFreePaxAllowed = false,
  freePaxRuleMsg,
  isHalfPaxAllowed = false,
  halfPaxRuleMsg,
}: {
  qty: number,
  setQty: (value: number) => void
  qtyAdult: number,
  setQtyAdult: (value: number) => void,
  qtyFree: number,
  setQtyFree: (value: number) => void
  qtyHalf: number,
  setQtyHalf: (value: number) => void
  maxPerRound: number,
  remaining: number | undefined,
  disabled: boolean,
  setMaxRound: (value: boolean) => void,
  isFreePaxAllowed?: boolean,
  freePaxRuleMsg?: string,
  isHalfPaxAllowed?: boolean,
  halfPaxRuleMsg?: string,
}) {

  const handlePlus = (type: string) => {
    if(qty === maxPerRound) {
      setMaxRound(true);
    } 
    if (qty < maxPerRound) {
      if (remaining && (qty < remaining)){
        type === "adult" && setQtyAdult(qtyAdult + 1)
        type === "free" && setQtyFree(qtyFree + 1)
        type === "half" && setQtyHalf(qtyHalf + 1)
        setQty(qty + 1)
      }
    }
  }

  const handleMinus = (type: string) => {
    setMaxRound(false);
    if ((qtyAdult > 0) && (type === "adult")) {
      setQtyAdult(qtyAdult - 1)
      setQty(qty - 1)
    } 
    if ((qtyFree > 0) && (type === "free")) {
      setQtyFree(qtyFree - 1)
      setQty(qty - 1)
    } 
    if ((qtyHalf > 0) && (type === "half")) {
      setQtyHalf(qtyHalf - 1)
      setQty(qty - 1)
    }
  }

  if (qtyAdult === 0) {
    setQtyFree(0);
    setQtyHalf(0);
    setQty(0)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex mb-2'>
        <p className='align-middle ml-auto mr-2 font-bold pt-4'>Passageiros:</p>

        <div className="join">
          <button
            className="join-item btn btn-lg bg-indigo-600 hover:bg-indigo-400 text-base-100 disabled:bg-indigo-200"
            onClick={() => handleMinus("adult")}
            disabled={disabled}
          >
            -
          </button>
          <input
            className={`join-item border w-16 disabled:bg-indigo-100
            ${styles.input}`}
            value={qtyAdult}
            disabled={disabled}
            readOnly
          />
          <button
            className="btn btn-lg bg-indigo-600 hover:bg-indigo-400 join-item text-base-100 disabled:bg-indigo-200"
            onClick={() => handlePlus("adult")}
            disabled={disabled}
          >
            +
          </button>
        </div>
      </div>

      {isFreePaxAllowed && (<div className='flex mb-2'>
        <p className='align-middle ml-auto mr-2 pt-4 text-right'><span className='font-bold'>{freePaxRuleMsg}:</span> <br />(não pagam)</p>

        <div className="join">
          <button
            className="join-item btn btn-lg bg-indigo-600 hover:bg-indigo-400 text-base-100 disabled:bg-indigo-200"
            onClick={() => handleMinus("free")}
            disabled={disabled || (qtyAdult <= 0)}
          >
            -
          </button>
          <input
            className={`join-item border w-16 disabled:bg-indigo-100
            ${styles.input}`}
            value={qtyFree}
            disabled={disabled}
            readOnly
          />
          <button
            className="btn btn-lg bg-indigo-600 hover:bg-indigo-400 join-item text-base-100 disabled:bg-indigo-200"
            onClick={() => handlePlus("free")}
            disabled={disabled || (qtyAdult <= 0)}
          >
            +
          </button>
        </div>
      </div>)}

      {isHalfPaxAllowed && (<div className='flex mb-2'>
        <p className='align-middle ml-auto mr-2 pt-4 text-right'><span className='font-bold'>{halfPaxRuleMsg}:</span> <br />(meia)</p>

        <div className="join">
          <button
            className="join-item btn btn-lg bg-indigo-600 hover:bg-indigo-400 text-base-100 disabled:bg-indigo-200"
            onClick={() => handleMinus("half")}
            disabled={disabled || (qtyAdult <= 0)}
          >
            -
          </button>
          <input
            className={`join-item border w-16 disabled:bg-indigo-100
            ${styles.input}`}
            value={qtyHalf}
            disabled={disabled}
            readOnly
          />
          <button
            className="btn btn-lg bg-indigo-600 hover:bg-indigo-400 join-item text-base-100 disabled:bg-indigo-200"
            onClick={() => handlePlus("half")}
            disabled={disabled || (qtyAdult <= 0)}
          >
            +
          </button>
        </div>
      </div>)}


    </div>

  )
}