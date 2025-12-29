const { GoogleGenerativeAI } = require("@google/generative-ai");
const { z } = require("zod");// Zod is a "Quality Control" tool. it make sure that data is not broken before we use it

// 1. Initialize Gemini with your FREE key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2.This is your contract. It tells the app: "An expense MUST have these 4 things, and the category MUST be one of these 6 words." This ensures your Charts and Dashboards don't break later. “An expense is NOT an expense unless it has:a number amount,a fixed category,a text description,a date”

const ExpenseSchema = z.object({
  amount: z.number(),
  category: z.enum(["Food", "Transport", "Entertainment", "Utilities", "Health", "Other"]),
  description: z.string(),
  date: z.string()
});
//Cleaning protects your server from crashing. Validation protects your database from corruption.

const parseExpenseWithAI = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Fast & Free

    const prompt = `
      Extract expense details from this text: "${userInput}".
      Today's date is ${new Date().toISOString().split('T')[0]}.
      Return ONLY a JSON object with these keys: amount, category, description, date.
    `;
//This is how we "talk" to the AI. We give it context (today's date) so if the user says "I spent money yesterday," the AI can calculate the correct date. We also strictly demand JSON ONLY so we don't get conversational filler like "Sure, here is your data!"

    const result = await model.generateContent(prompt); //sends your instruction(the prompt) to Google We use await because Google takes a few seconds to "think."
    const response = await result.response;
   //  This waits for the full "package" to arrive back at your server.
    const text = response.text(); //This opens the package and extracts just the words the AI wrote. At this stage, the data is just a long String (text), not a JavaScript object yet.
    
    // Clean the AI response (sometimes it adds markdown ```json blocks)
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const rawData = JSON.parse(cleanJson); //This turns the string "{ "amount": 10 }" into a real JavaScript object obj.amount = 10.
    
    return ExpenseSchema.parse(rawData);//This is the Zod Security Guard. It looks at the object and says: "Does this have an amount? Is it a number? Good. Does it have a category? Good." If everything is perfect, it sends the data to your controller.
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("AI Parsing failed.");
  }
};

module.exports = { parseExpenseWithAI };