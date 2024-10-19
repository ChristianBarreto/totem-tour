export default function IsShownWhereBadge({
  isShownDisplay,
  isShownPurchase,
}: {
  isShownDisplay?: boolean
  isShownPurchase?: boolean
}) {

  return (
    <div className="flex">
      {isShownDisplay && <span className="m-1 mr-0 badge bg-yellow-200">Display</span>}
      {isShownPurchase && <span className="m-1 badge bg-red-200">Compra</span>}
    </div>
  )
}