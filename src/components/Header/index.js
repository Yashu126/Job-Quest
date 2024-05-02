import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link className="link" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          width="100"
        />
      </Link>
      <div className="home-job-con">
        <Link className="link" to="/">
          <p className="nav-opt">Home</p>
        </Link>
        <Link className="link" to="/jobs">
          <p className="nav-opt">Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
      <ul className="icons-con">
        <li className="icon-li">
          <Link className="link" to="/">
            <AiFillHome className="icons-style" />
          </Link>
        </li>
        <li className="icon-li">
          <Link className="link" to="/jobs">
            <BsBriefcaseFill className="icons-style" />
          </Link>
        </li>
        <li className="icon-li">
          <button
            aria-label="Button Label"
            type="button"
            className="icon-log-btn"
            onClick={onLogout}
          >
            <FiLogOut className="icons-style" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
