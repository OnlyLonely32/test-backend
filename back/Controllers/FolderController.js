import FolderService from "../Services/FolderService.js"

class FolderController {
    async create(req, res){
        try {
            const folder = await FolderService.create(req.body)
            return res.status(200).json(folder)
        } catch (e) {
            return res.status(500).json(e.message )
        }
    }

    async getAll(req, res){
        try {
            const folders = await FolderService.getAll()
            return res.status(200).json(folders)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const folder = await FolderService.delete(req.params.id)
            return res.status(200).json(folder)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new FolderController()