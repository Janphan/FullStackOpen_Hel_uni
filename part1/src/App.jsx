
const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        { name: 'Fundamentals of React', exercises: 10 },
        { name: 'Using props to pass data', exercises: 7 },
        { name: 'State of a component', exercises: 14 },
    ];

//Header
    const Header = ({course}) => {

        return (
            <>
                <h1>{course}</h1>
            </>
        )
    }
    //part
    const Part = ({ part }) => {
        return (
            <p>
                {part.name} {part.exercises}
            </p>
        );
    };

    //content
    const Content = ({parts}) => {
        return (
            <div>
                {parts.map((part, index) => (
                    <Part key={index} part={part}/>
                ))}
            </div>
        );
    };
    //total ex
    const Total = ({parts}) => {
        let totalExercise = 0;
        for (const part of parts) {
            totalExercise += part.exercises;
        }
        return (
            <>
                <p>Number of exercises {totalExercise}  </p>
            </>
        )
    }
    return (
        <div>
            <Header course = {course}/>
            <Content parts={parts}/>
            <Total parts={parts}/>
        </div>
    )
}

export default App