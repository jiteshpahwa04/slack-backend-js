import { JOIN_CHANNEL_EVENT } from "../utils/common/eventConstants.js";

export default function messageHandler(io, socket) {
    socket.on(JOIN_CHANNEL_EVENT, async function joinChannelHandler(data, cb) {
        console.log("Joining channel with data:", data);
        const roomId = data.channelId;
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
        cb({
            success: true,
            message: `Joined channel ${roomId} successfully`
        });
    });
}