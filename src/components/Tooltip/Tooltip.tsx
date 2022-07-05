import React from "react"

import "./tooltip-styles.css"

export interface TooltipProps{
 children: JSX.Element
 message:string
 styleClass?:string
}

const Tooltip = ({children,message,styleClass}: TooltipProps) => {
  return (
    <div className={`tooltip ${styleClass}` }>
      <span className="tooltiptext">{message}</span>
      {children}
    </div>
  )
}

export default Tooltip