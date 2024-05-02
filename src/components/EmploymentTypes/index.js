import './index.css'

const EmploymentTypes = props => {
  const {handleCheckBok, employ} = props
  return (
    <li className="salary-li">
      <input
        className="radio-in"
        onChange={() => handleCheckBok(employ.employmentTypeId)}
        type="checkbox"
        id={employ.employmentTypeId}
      />
      <label className="salary-label" htmlFor={employ.employmentTypeId}>
        {employ.label}
      </label>
    </li>
  )
}

export default EmploymentTypes
