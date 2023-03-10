import { Link } from 'react-router-dom'
import Clamp from '../Clamp'
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav>
      <Clamp className='Navbar'>
        <h1><span>{'>'}</span> NOBU<span className='Flash'>_</span></h1>
        <div className="HangRight">
          <Link to="#projects">Projects</Link>
          <Link to="#connect">Connect</Link>
          <Link to="#about">About</Link>
        </div>
      </Clamp>
    </nav>
  )
}

export default Navbar