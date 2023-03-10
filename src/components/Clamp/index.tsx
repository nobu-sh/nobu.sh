import { FC, ReactNode } from 'react'

import './Clamp.scss'

interface ClampProps {
  children: ReactNode,
  className?: string
}

const Clamp: FC<ClampProps> = ({
  children,
  className,
}) => {
  return (
    <section className="Clamper">
      <div className={className ?? 'Content'}>
        {children}
      </div>
    </section>
  )
}

export default Clamp
