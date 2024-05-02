import './index.css'
import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const Jobs = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-background">
        <div className="logo-tilte-con">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div>
            <h3>{title}</h3>
            <p>
              <BsStarFill className="star" /> {rating}
            </p>
          </div>
        </div>
        <div className="location-package">
          <div className="logo-tilte-con">
            <div className="logo-tilte-con">
              <MdLocationOn />
              <p className="loc-emp-type">{location}</p>
            </div>
            <div className="logo-tilte-con">
              <BsBriefcaseFill />
              <p className="loc-emp-type">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default Jobs
