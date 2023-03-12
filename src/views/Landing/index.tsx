import Top from './sections/Top'

import './Landing.scss'
import Projects from './sections/Projects'
import About from './sections/About'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Landing = () => {
  const location = useLocation()

  useEffect(() => {
    if (!['#projects', '#about', '#connect'].includes(location.hash)) return

    const elem = document.getElementById(location.hash)
    if (!elem) return

    const yOffet = -100
    const y = elem.getBoundingClientRect().top + window.scrollY + yOffet

    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [location.hash])

  return (
    <div className="Landing">
      <Top />
      <Projects />
      <About />
    </div>
  )
}

export default Landing
