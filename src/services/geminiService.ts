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

export async function getFullStory(book: Book): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a detailed, immersive, and gripping narrative summary of the "full story" for the Malaysian teen investigation book "${book.title}" by ${book.author}. 
      The story should focus on a group of Malaysian teenagers solving a mystery. 
      Include local Malaysian cultural elements, slang (like 'lah', 'jom'), and specific locations mentioned in the description.
      Include the setup, the key investigation steps taken by the teens, the turning point, and the resolution. 
      Format it in 4-5 substantial paragraphs.`,
    });
    return response.text || "Story content unavailable.";
  } catch (error) {
    console.error("Full Story Generation Error:", error);
    return "Failed to load the full story.";
  }
}
