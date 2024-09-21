
export function Button({
  children,
  ...props
}: {
  children: string
}) {
  return (
    <button className="btn" {...props}>{children}</button>
  )
}