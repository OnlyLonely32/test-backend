import Card from "../Models/Card.js"

class CardService {
    async create(card){
        const createdCard = await Card.create(card)
        return createdCard
    }

    async find(req){
        const folder = req.params.id
        const cards = await Card.find({folder})
        return cards
    }

    async delete(id){
        if(!id){
            throw new Error('id не указан')
        }
        const card = await Card.findByIdAndDelete(id)
        return card
    }
}

export default new CardService()