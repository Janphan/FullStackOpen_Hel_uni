import React from "react";

const Header = ({ courseName }) => <h3>{courseName}</h3>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }) => (
  <li>
    {part.name} : {part.exercises}
  </li>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total of {total} exercises</p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Courses = ({courses}) => {
    return(
        <>
        {courses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </>
    )
    
}

export default Courses;


