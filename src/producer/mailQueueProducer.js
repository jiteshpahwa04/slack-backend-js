import mailQueue from "../queues/mailQueue.js";

export const addEmailToMailQueue = async (emailData) => {
    try {
        await mailQueue.add(emailData);
        console.log("Email added to mail queue");
    } catch (error) {
        console.error("Error in addEmailToMailQueue:", error);
    }
}