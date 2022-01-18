import CardService from "../Services/CardService.js"

class CardController {
    async create(req, res){
        try {
            // Card запрос посылает параметры в req.body
            const card = await CardService.create(req.body)
            return res.status(200).json(card)
        } catch (e) {
            return res.status(500).json(e.message )
        }
    }

    async getFromFolder(req, res){
        try {
            const cards = await CardService.find(req)
            return res.status(200).json(cards)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getAll(req, res){
        try {
            const cards = await CardService.getAll()
            return res.status(200).json(cards)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const card = await CardService.delete(req.params.id)
            return res.status(200).json(card)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new CardController()