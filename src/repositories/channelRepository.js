import Channel from "../schema/channel.js";
import crudRepository from "./crudRepository.js";

const channelRepository = {
    ...crudRepository(Channel),
    deleteByWorkspaceId: async function (workspaceId) {
        const response = await Channel.deleteMany({ workspaceId: workspaceId });
        return response;
    },
    getChannelWithWorkspaceDetails: async function (channelId) {
        const channel = await Channel.findById(channelId).populate('workspaceId');
        return channel;
    }
};

export default channelRepository;