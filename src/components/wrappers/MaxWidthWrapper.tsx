import type { ReactNode } from "react"

type Props = {
    children: ReactNode;
    className?: string;
}


const MaxWidthWrapper = ({ children, className = "" }: Props) => {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper