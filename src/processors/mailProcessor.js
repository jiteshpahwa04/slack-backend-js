import mailer from "../config/mailConfig.js";
import mailQueue from "../queues/mailQueue.js";

mailQueue.process(async (job) => {
    const emailData = job.data;
    console.log("Processing email:", emailData);

    try {
        await mailer.sendMail(emailData);
        console.log("Email sent successfully to:", emailData.to);
    } catch (error) {
        console.error("Error processing email:", error);
    }
});