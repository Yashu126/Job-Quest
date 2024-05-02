import './index.css'
import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <div className="home-con">
    <Header />
    <div className="home-content-con">
      <h1 className="find-job-head">Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="link" to="/jobs">
        <button className="find-job-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
