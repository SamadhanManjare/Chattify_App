
import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
   try{
    const decision = await aj.protect(req); // Deduct 1 token from the bucket
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return res.status(429).json({ message: "Too Many Requests" });
        } else if (decision.reason.isBot()) {
            return res.status(403).json({ message: "No bots allowed" });
        } else {
            return res.status(403).json({ 
                message: "Access denied by Security Policy" });
        }
}   
   if(decision.results.some(isSpoofedBot)) {
    return res.status(403).json({ 
        message: "Access denied due to bot suspicion",
        error: "Spoofed Bot Detected" });
   }
    next();

    }catch (error) {
     console.error("Arcjet middleware error:", error);
     next();
   } 
}

export default arcjetProtection;


