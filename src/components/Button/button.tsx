import { CSSProperties, ButtonHTMLAttributes } from "react"
import style from "./button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    rowSpan?: number,
    colSpan?: number,
    operator?: boolean
}

export default function Button( props: ButtonProps ){
    const { colSpan, rowSpan, operator=false, children, ...restProps } = props

    const dynamic_style: CSSProperties = {
        gridColumn: `span ${colSpan??1}`,
        gridRow: `span ${rowSpan??1}`,        
    }

    return(
        <button {...restProps} data-operator={operator} style={dynamic_style} className={style.button} >
            {children}
        </button>
    )
}