import type { ReactNode } from "react"

type Props = {
    children: ReactNode;
    className?: string;
}

const MaxWidthWrapper = ({ children, className = "" }: Props) => {
    return (
        <div className={`w-full px-2 sm:px-4 md:px-6 ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper