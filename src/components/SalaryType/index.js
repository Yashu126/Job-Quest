import './index.css'

const SalaryType = props => {
  const {hangleRadio, salary} = props
  return (
    <li className="salary-li">
      <input
        className="radio-in"
        onChange={() => hangleRadio(salary.salaryRangeId)}
        name="salary"
        type="radio"
        id={salary.salaryRangeId}
      />
      <label className="salary-label" htmlFor={salary.salaryRangeId}>
        {salary.label}
      </label>
    </li>
  )
}
export default SalaryType
