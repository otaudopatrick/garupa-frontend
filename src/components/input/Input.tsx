import React from "react"
import { BsExclamationCircleFill } from "react-icons/bs"
import Tooltip from "../Tooltip"

import "./input-styles.css"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  children?: JSX.Element,
  hasError:string | null
}
const Input = ({type = "text",placeholder,value,hasError, children,...props}: InputProps)=> {
  let styleClass = "form-input-text"
  if(children){
    styleClass+= " icon"
  }
 return(
  <div className={styleClass}>
  {children}
  <input type={type} placeholder={placeholder} value={value} className={hasError ? "error" : ""} {...props}/>
  <div className={`tooltip-container ${hasError ? "error" : ""}`}>
  <Tooltip message={hasError ?? ""}>
    <BsExclamationCircleFill color="#c80000" className={hasError ? "error" : ""}/>  
   </Tooltip>
  </div>

  </div>
 )
}

export default Input