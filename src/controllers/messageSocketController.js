import { createMessageService } from "../service/messageService.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT } from "../utils/common/eventConstants.js";

export default function messageHandler(io, socket) {
    socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
        console.log("Received new message data:", data);
        const createdMessage = await createMessageService(data);
        const {channelId} = data;
        io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, createdMessage); // io.to().emit() to broadcast to all in the room
        cb({
            success: true,
            message: "Message created successfully",
            data: createdMessage
        });
    });
}