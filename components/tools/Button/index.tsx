import { FC, PropsWithChildren, HTMLAttributes } from "react"

interface IButton extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean | false,
    typeButton: "button" | "submit" | "reset" | undefined,
    children: unknown,
}

const ButtonComponent: FC<PropsWithChildren<IButton>> = (props) => {
    const { disabled, typeButton, className, ...anotherProps } = props;
    return (
        <button
            type={typeButton}
            disabled={disabled}
            {...anotherProps}
            className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
            {props.children ? props.children : 'Submit'}
        </button>
    )
}

export default ButtonComponent