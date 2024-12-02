import IconConnectionSlash from "../../atoms/IconConnectionSlash"

export default function ProductFetchError() {
  return (
    <div className="border rounded p-8 shadow-md">
      <div className="flex justify-center">
        <IconConnectionSlash />
      </div>
      <div>
        <p className="text-gray-400">Me parece que estamos sem internet, tente novamente mais tarde.</p>
      </div>
    </div>
  )
}