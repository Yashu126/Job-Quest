import './index.css'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJob = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-job-background">
      <div className="logo-tilte-con">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div>
          <h3>{title}</h3>
          <p>
            <BsStarFill className="star" /> {rating}
          </p>
        </div>
      </div>
      <h3>Description</h3>
      <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJob
