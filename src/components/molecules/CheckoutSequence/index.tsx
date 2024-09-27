type Item = {
  id: number
  name: string,
  active: boolean
}

type Sequence = Item[];

export default function CheckoutSequence({
  sequence,
}: {
  sequence: Sequence,
}) {
  
  return (
    <ul className="timeline">
      {sequence.map((item, index) => (
        <li key={item.id}>
          {index !== 0 && <hr className={`${item.active && 'bg-primary'}`} />}
          <div className="timeline-start w-52 text-center">{item.name}</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-5 w-5 ${item.active && 'text-primary'}`}>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd" />
            </svg>
          </div>
          {(index !== sequence.length-1) &&<hr className={`${item.active && 'bg-primary'}`} />}
        </li>
      ))}
    </ul>
  )
}