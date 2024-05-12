import React from "react";

interface Props {
  skills: string | undefined | null;
}

const Skills: React.FC<Props> = ({ skills }) => {
  // Check if skills is a string and not undefined or null
  if (typeof skills !== 'string' || !skills) {
    return null; // or handle this case as per your requirements
  }

  // Use non-null assertion operator to assure TypeScript that skills is not null or undefined
  const skillsArray = skills!.split(',').map(skill => skill.trim());

  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {skillsArray.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  );
};

export default Skills;
