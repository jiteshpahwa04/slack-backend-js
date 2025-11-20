export default function crudRepository(schema) {
    return {
        model: schema,
        create: async (data) => {
            const newDoc = await this.model.create(data);
            return newDoc;
        },
        findById: async (id) => {
            const doc = await this.model.findById(id);
            return doc;
        },
        findAll: async (filter = {}) => {
            const docs = await this.model.find(filter);
            return docs;
        },
        updateById: async (id, updateData) => {
            const updatedDoc = await this.model.findByIdAndUpdate(id, updateData, { new: true });
            return updatedDoc;
        },
        deleteById: async (id) => {
            await this.model.findByIdAndDelete(id);
        }
    }
}