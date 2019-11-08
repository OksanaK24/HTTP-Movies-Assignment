import React, {useState, useEffect} from "react";
import axios from "axios";

export default function MovieUpdate(props){
    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: [],
    })

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then((result) => {
                setMovie(result.data)
            })
            .catch((error) =>{
                console.log(error)
            })
    }, [props.match.params.id])
    
    const handleChange = (event) => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(() => {
                props.history.push("/")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="update-movie">
            <h1>Update movie</h1>

            <p>Please pay attention that changes can't be undone.</p>

            <form onSubmit={handleSubmit} className="update-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={movie.title}
                    onChange={handleChange}
                    className="update-input"
				/>

                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    value={movie.director}
                    onChange={handleChange}
                    className="update-input"
				/>

                <input
                    type="number"
                    name="metascore"
                    placeholder="Metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                    className="update-input"
				/>

{/* Has to modify the last input - when I try to change actor's name it causes error. Has to restart listening to port. Update: now it's says "movie.stars.map isn't a function" */}
                <div>
                    <h3>Stars:</h3>
                {movie.stars &&
                movie.stars.map(star => (
                    <div key={star.id}>
                        <input
                        type="text"
                        name="stars"
                        placeholder="Stars"
                        value={star}
                        onChange={handleChange}
                        className="update-input"
                        />
                    </div>
                ))}
                </div>

                <button type="submit" className="update-button">Save Changes</button>
            </form>
        </div>
    )
}