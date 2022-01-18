import Folder from "../Models/Folder.js"

class FolderService {
    async create(folder){
        const createdFolder = await Folder.create(folder)
        return createdFolder
    }

    async getAll(){
        const folders = await Folder.find()
        return folders
    }

    async getOne(id){
        if(!id) {
            throw new Error('id не указан')
        }
        const folder = await Folder.findById(id)
        return folder
    }

    async update(Folder){
        if(!Folder._id){
            throw new Error('id не указан')
        }
        const updatedFolder = await Folder.findByIdAndUpdate(Folder._id, Folder, {new: true})
        return updatedFolder
    }

    async delete(id){
        if(!id){
            throw new Error('id не указан')
        }
        const folder = await Folder.findByIdAndDelete(id)
        return folder
    }
}

export default new FolderService()