const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");

Movies.belongsToMany(Actors, { through: 'MovieActors'} );
Actors.belongsToMany(Movies, { through: 'MovieActors'} );

Movies.belongsToMany(Directors, { through: 'MoviesDirectors'} );
Directors.belongsToMany(Movies, { through: 'MoviesDirectors'} );

Movies.belongsToMany(Genres, { through: 'MovieGenres'} );
Genres.belongsToMany(Movies, { through: 'MovieGenres'} );