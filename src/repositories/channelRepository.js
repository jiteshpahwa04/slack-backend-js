import Channel from "../schema/channel";
import crudRepository from "./crudRepository.js";

const channelRepository = {
    ...crudRepository(Channel),
};

export default channelRepository;