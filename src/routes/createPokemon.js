const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokémon ${req.body.name} a bien été crée.`
                res.json({ message, data: pokemon })
            })
            .catch(err => {
                const message = `Le pokémons n'a pas pu être ajouter. Réessayez dans quelques instants`;
                res.status(500).json({ message, data: err })
            })
    })
}