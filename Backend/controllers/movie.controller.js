const Movie = require('../models/movie.model');

const movieCtrl = {};

// Función para ver todas las películas

movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find().then((data) => res.status(200)
        .json({status: 'ok', data: data}))
        .catch((err) => console.error(err))
}

// Función que devuelve una película dado un ID

movieCtrl.getMovie = async (req, res) => {
    await Movie.findById(req.params.id)
        .then((data) => {
            if (data) res.status(200)
                .json({status: 'Ok', data: data})
            else res.status(404)
                .json({status: 'Not found'})

        })
        .catch(err => console.error(err));
}

// Añadir una película
movieCtrl.addMovie = async (req, res) => {
    const myMovie = new Movie(req.body);
    await myMovie.save()
        .then(() => {
            res.status(201)
                .json({
                    status: 'Created',
                    message: 'Movies successfully created'
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'Error',
                    message: err.message
                });
            console.error(err)
        })
}

// Añadir más de una película

movieCtrl.addMovies = async (req, res) => {
   const movies = req.body;
   console.log(movies);
    await Movie.insertMany(movies)
        .then(() => {
            res.status(201)
                .json({
                    status: 'Created',
                    message: 'Movies successfully created'
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'Error',message: err.message
                });
            console.error(err);
        });
}


// Actualizar una película

movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movie},
        {new: true}
    )
        .then((data) => {
            if (data) res.status(200)
                .json({
                    status: 'Ok', message: 'Movie successfully updated',
                    data: data
                })
            else res.status(404)
                .json({status: 'Movie not found'})
        })
        .catch(err =>{
            console.error(err);
            res.status(400).json({status: 'Error',message:err.message})
        })
}

// Función para borrar

movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
        .then(data =>{
            if (data)res.status(200).json({stat:'OK', message: 'Movie successefully deleted'})

            else res.status(404)
                .json({status: 'Not found', message:'Movie not found'})

        }).catch(err => {
            console.error(err);
            res.status(400)
                .json({status:'Error', message:err.message})
        })
}

//Buscar los géneros de las películas

movieCtrl.getGenres = async (req, res) =>{
    await Movie.find().distinct('genres')
        .then((data) => {
            res.status(200)
                .json({status: 'OK', message:'Genres loaded'})
        }).catch(err => {
            console.error(err);
            res.status(400)
                .json({status:'Error', message:err.message})
        })
}
module.exports = movieCtrl;