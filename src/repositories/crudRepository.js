export default function crudRepository() {
    return {
        create: async function (data) {
            const newDoc = await this.create(data);
            return newDoc;
        },
        findById: async function (id) {
            const doc = await this.findById(id);
            return doc;
        },
        findAll: async function (filter = {}) {
            const docs = await this.find(filter);
            return docs;
        },
        updateById: async function (id, updateData) {
            const updatedDoc = await this.findByIdAndUpdate(id, updateData, { new: true });
            return updatedDoc;
        },
        deleteById: async function (id) {
            await this.findByIdAndDelete(id);
        }
    }
}