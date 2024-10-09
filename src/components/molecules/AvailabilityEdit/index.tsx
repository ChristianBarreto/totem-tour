import dayjs from "dayjs";
import IconCheckCircle from "../../atoms/IconCheckCircle";
import AvailabilityModal from "../AvailabilityModal";
import { useState } from "react";
import { Availabilities, Product } from "../../../api";
import IconXCircle from "../../atoms/IconXCircle";

export default function AvailabilityEdit({
  product,
  day,
  availabilities,
  setReloadTable,
  reloadTable,
}: {
  product: Product,
  day: number,
  availabilities: Availabilities,
  setReloadTable: (value: number) => void
  reloadTable: number
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const date = dayjs().add(day, "days").format('YYYY-MM-DD');

  const availability = availabilities.find((av) => {
    if ((av.productId === product.id) && (av.date === date)) {
      return av
    }
    return null
  })

  return (
    <div>
      {availability ? (
        <button className={`btn btn-sm btn-ghost p-1 gap-0 ${availability.active ? "text-primary" : "text-red-500"}`} onClick={() => setModalOpen(true)}>
          {availability.active ? <IconCheckCircle classes="size-4"/> : <IconXCircle classes="size-4"/>}
          {availability.booked}/{availability.availability}
        </button>
      ): (
        <button className="btn btn-sm btn-ghost p-1 w-14" onClick={() => setModalOpen(true)}>
          -
        </button>
      )}
      {modalOpen && (
        <AvailabilityModal
          open={modalOpen}
          setOpen={setModalOpen}
          date={date}
          product={product}
          availabilityId={availability?.id}
          setReloadTable={setReloadTable}
          reloadTable={reloadTable}
        />
      )}
    </div>
  )
}