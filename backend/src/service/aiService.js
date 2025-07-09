import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/config.js";
import { GoogleGenAI } from "@google/genai"
export const ai = new GoogleGenAI({ apiKey: config.GOOGLE_SECRET_KEY });


const genAI = new GoogleGenerativeAI(config.GOOGLE_SECRET_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


export default model;   