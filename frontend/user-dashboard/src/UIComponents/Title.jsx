import React from 'react'
import classNames from 'classnames'

function Title({children,className}) {
  return (
    <h1 className={classNames("font-bold",className)}>{children}</h1>
  )
}

export default Title
