import style from "./display.module.css"

interface DisplayProps {
    expression: string
}

export default function Display( {expression}: DisplayProps ){
    return(
        <div className={style.display}>
            {expression}
        </div>
    )
}