import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
}

const MaxWidthWrapper2 = ({ children, className = "" }: Props) => {
    return (
        <div className={`w-full px-4 sm:px-6 md:px-8 ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper2