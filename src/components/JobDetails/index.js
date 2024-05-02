import './index.css'
import {Component} from 'react'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import Skills from '../Skills'

const apiStatusObj = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusObj.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusObj.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const dataDetails = data.job_details
      const jobDetails = {
        companyLogoUrl: dataDetails.company_logo_url,
        companyWebsiteUrl: dataDetails.company_website_url,
        employmentType: dataDetails.employment_type,
        id: dataDetails.id,
        jobDescription: dataDetails.job_description,
        location: dataDetails.location,
        packagePerAnnum: dataDetails.package_per_annum,
        rating: dataDetails.rating,
        title: dataDetails.title,
        skills: dataDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: dataDetails.life_at_company.description,
          imageUrl: dataDetails.life_at_company.image_url,
        },
      }
      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
        employmentType: each.employment_type,
      }))
      this.setState({apiStatus: apiStatusObj.success, jobDetails, similarJobs})
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  renderLoading = () => (
    <div className="job-details-load-con" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="job-details-load-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        width="50%"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="fail-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        onClick={() => this.getJobItemDetails()}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      rating,
      location,
      packagePerAnnum,
      title,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <div className="success-con">
        <div className="job-details-con">
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
          <div className="des-con">
            <h3>Description</h3>
            <div className="visit">
              <a href={companyWebsiteUrl}>Visit</a>
              <FiExternalLink />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h3>Skills</h3>
          <ul className="skills-con">
            {skills.map(each => (
              <Skills key={each.name} skill={each} />
            ))}
          </ul>
          <h3>Life at Company</h3>
          <div className="at-company-con">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h3>Similar Jobs</h3>
        <ul className="similar-jobs-con">
          {similarJobs.map(each => (
            <SimilarJob key={each.id} similarJob={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.loading:
        return this.renderLoading()
      case apiStatusObj.success:
        return this.renderSuccess()
      case apiStatusObj.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-page">
        <Header />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}

export default JobDetails
