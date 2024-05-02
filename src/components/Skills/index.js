import './index.css'

const Skills = props => {
  const {skill} = props
  return (
    <li className="skill">
      <img src={skill.imageUrl} alt={skill.name} width="30" />
      <p className="skill-name">{skill.name}</p>
    </li>
  )
}

export default Skills
