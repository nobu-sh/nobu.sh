import { FC } from 'react'
import './Basic.scss'

export const Basic: FC<{
  children?: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className="Layout_Basic">
    {
      className
        ? <div className={className}>{children}</div>
        : <>{children}</>
    }
  </div>
)
