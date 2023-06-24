const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Pokemon.findByPk(id)
                    .then(pokemon => {
                        if (pokemon === null) {
                            const message = `le pokemon demander n'existe pas . Réessayer avec un autre identifiant`;
                            res.status(404).json({ message })
                        }
                        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
                        res.json({ message, data: pokemon })
                    })
            })
            .catch(err => {
                const message = `Le pokémons n'a pas pu être modifier. Réessayez dans quelques instants`;
                res.status(500).json({ message, data: err })
            })
    })
}