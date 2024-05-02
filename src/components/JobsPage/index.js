import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentTypes from '../EmploymentTypes'
import SalaryType from '../SalaryType'
import Jobs from '../Jobs'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusObj = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsPage extends Component {
  state = {
    checkedItems: [],
    salaryRange: '',
    apiStatus: apiStatusObj.initial,
    jobsList: [],
    searchText: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusObj.loading})
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const {checkedItems, salaryRange, searchText} = this.state
    const apiurl = `https://apis.ccbp.in/jobs?employment_type=${checkedItems.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchText}`
    const response = await fetch(apiurl, option)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const modifiedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: modifiedData, apiStatus: apiStatusObj.success})
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  onSearch = event => {
    this.setState({searchText: event.target.value})
  }

  searchEnter = () => {
    this.getJobs()
  }

  handleCheckBok = id => {
    const {checkedItems} = this.state
    if (checkedItems.includes(id)) {
      this.setState(
        prev => ({
          checkedItems: prev.checkedItems.filter(each => each !== id),
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prev => ({checkedItems: [...prev.checkedItems, id]}),
        this.getJobs,
      )
    }
  }

  hangleRadio = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="loader-container">
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
        onClick={() => this.getJobs()}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length === 0 ? (
          <div className="no-jobs-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              width="50%"
            />
            <h1 className="fail-para">No Jobs Found</h1>
            <p className="fail-para">
              We could not find any jobs. Try other filters
            </p>
          </div>
        ) : (
          <ul className="jobs-ul">
            {jobsList.map(each => (
              <Jobs key={each.id} job={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderPage = () => {
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
    const {searchText} = this.state
    return (
      <div className="jobs-page">
        <Header />
        <div className="main-page">
          <div className="sm-search">
            <input
              placeholder="Search"
              className="search"
              onChange={this.onSearch}
              value={searchText}
              type="search"
            />
            <button
              aria-label="Button Label"
              className="search-btn"
              type="button"
              data-testid="searchButton"
              onClick={this.searchEnter}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-section">
            <Profile />
            <hr />
            <h2>Type of Employment</h2>
            <ul className="salary-ul ">
              {employmentTypesList.map(each => (
                <EmploymentTypes
                  key={each.employmentTypeId}
                  employ={each}
                  handleCheckBok={this.handleCheckBok}
                />
              ))}
            </ul>
            <hr />
            <h2>Salary Range</h2>
            <ul className="salary-ul">
              {salaryRangesList.map(each => (
                <SalaryType
                  key={each.salaryRangeId}
                  hangleRadio={this.hangleRadio}
                  salary={each}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-section">
            <div className="lg-search">
              <input
                className="search"
                onChange={this.onSearch}
                value={searchText}
                type="search"
                placeholder="Search"
              />
              <button
                aria-label="Button Label"
                className="search-btn"
                type="button"
                data-testid="searchButton"
                onClick={this.searchEnter}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderPage()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
