import { Link } from 'react-router-dom'
import Clamp from '../Clamp'
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav>
      <Clamp className='Navbar'>
        <h1><span className='Retro'>{'>'}</span> <span className='Glow'>NOBU</span><span className='Retro Flash'>_</span></h1>
        <div className="HangRight">
          <Link to="#projects">Projects</Link>
          <Link to="#about">About</Link>
          <Link to="#connect">#</Link>
        </div>
      </Clamp>
    </nav>
  )
}

export default Navbar