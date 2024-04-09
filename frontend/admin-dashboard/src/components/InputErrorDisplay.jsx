import classNames from "classnames"
function InputErrorDisplay({children,className}) {
    const defaultClasses="capitalize text-sm"
  return (
    <div className="ml-5 font-semibold text-red-500">
        <span className={classNames(defaultClasses,className)}>{children}</span>
    </div>
  )
}

export default InputErrorDisplay
