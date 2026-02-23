import { GoogleGenAI, Type } from "@google/genai";
import { GLOBAL_BOOKS, Book } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAIRecommendations(query: string): Promise<Book[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for: "${query}". 
      Based on the following catalog of global books, return a list of IDs for the top 3 most relevant books.
      
      Catalog:
      ${JSON.stringify(GLOBAL_BOOKS.map(b => ({ id: b.id, title: b.title, author: b.author, description: b.description, country: b.country, genre: b.genre })))}
      
      Return ONLY a JSON array of strings (IDs).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const recommendedIds = JSON.parse(response.text || "[]") as string[];
    return GLOBAL_BOOKS.filter(book => recommendedIds.includes(book.id));
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return [];
  }
}

export async function getBookSummary(book: Book): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief, atmospheric, and enticing 2-sentence summary for the book "${book.title}" by ${book.author} from ${book.country}. 
      Genre: ${book.genre}. Original description: ${book.description}. 
      Make it sound like a literary review highlight.`,
    });
    return response.text || book.description;
  } catch (error) {
    return book.description;
  }
}
