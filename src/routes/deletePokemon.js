const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = `le pokemon demander n'existe pas . Réessayer avec un autre identifiant`;
                res.status(404).json({ message })
            }

            const pokemonDeleted = pokemon;
            return Pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                    res.json({ message, data: pokemonDeleted })
                })
        })
            .catch(err => {
                const message = `Le pokémons n'a pas pu être supprimer. Réessayez dans quelques instants`;
                res.status(500).json({ message, data: err })
            })
    })
}