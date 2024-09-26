export default function CardSkeleton({
  width = 80
}: {
  width?: number
}) {
  return (
    <div className={`flex w-52 flex-col gap-4 w-full md:w-${width}`}>
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  )
}