import { LegacyRef } from "react"

export const Toast = (props: IToast) => {
    return (
        <div ref={props.refer} className={`border rounded-sm w-full p-3 my-4 font-bold border-${props.color}-500 border-l-4 gap-4 flex items-center ${props.className}`}>
            <i  className={`${props.icon} bg-${props.color}-500 p-2 text-white rounded-full text-center`} ></i>
            {props.text}
        </div>
    )
}

export interface IToast {
    text?: string;
    icon?: string;
    color?: string;
    refer?: LegacyRef<HTMLDivElement>;
    className?: string;
}