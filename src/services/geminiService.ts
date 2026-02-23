import { GoogleGenAI, Type } from "@google/genai";
import { GLOBAL_BOOKS, Book } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAIRecommendations(query: string): Promise<Book[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Pengguna sedang mencari: "${query}". 
      Berdasarkan katalog buku penyiasatan Malaysia berikut, kembalikan senarai ID untuk 3 buku yang paling relevan.
      
      Katalog:
      ${JSON.stringify(GLOBAL_BOOKS.map(b => ({ id: b.id, title: b.title, author: b.author, description: b.description, country: b.country, genre: b.genre })))}
      
      Kembalikan HANYA array JSON string (ID).`,
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
      contents: `Berikan ringkasan 2 ayat yang ringkas, menarik, dan penuh suasana dalam Bahasa Malaysia untuk buku "${book.title}" oleh ${book.author}. 
      Genre: ${book.genre}. Deskripsi asal: ${book.description}. 
      Jadikan ia kedengaran seperti ulasan sastera yang hebat.`,
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
      contents: `Tuliskan "Kisah Penuh" yang sangat terperinci dan mendalam untuk novel penyiasatan remaja Malaysia bertajuk "${book.title}" oleh ${book.author}. 
      
      Arahan Penting:
      1. Jangan tulis ringkasan. Tuliskan kronologi lengkap cerita dari Bab 1 hingga penamat.
      2. Gunakan gaya penceritaan "Siri Hadi" yang klasik.
      3. Bahagikan kepada bahagian: "Permulaan Kes", "Penyiasatan Bermula", "Petunjuk Misteri", "Kemuncak Konflik", dan "Peleraian & Penangkapan".
      4. Sertakan butiran tentang bagaimana Hadi dan rakan-rakannya (seperti Kamal atau rakan lain) menggunakan logik dan keberanian mereka.
      5. Gunakan Bahasa Malaysia yang kaya dengan suasana tempatan (latar kampung/bandar, budaya, dan dialog santai).
      6. Pastikan pembaca tahu dengan jelas siapa dalangnya dan bagaimana mereka ditangkap.
      
      Sasaran panjang: Sekurang-kurangnya 800-1000 patah perkataan.`,
    });
    return response.text || "Kandungan cerita tidak tersedia.";
  } catch (error) {
    console.error("Full Story Generation Error:", error);
    return "Gagal memuatkan kisah penuh.";
  }
}

export async function generateBookCover(book: Book): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Kulit buku realistik untuk novel penyiasatan remaja Malaysia bertajuk "${book.title}" oleh ${book.author}. 
            Kulit buku harus menampilkan gaya ilustrasi Malaysia klasik tahun 90-an. 
            Elemen visual: ${book.description}. 
            Tajuk dan nama pengarang harus kelihatan jelas dalam fon vintaj yang tebal. 
            Latar belakang harus kelihatan seperti kampung atau bandar di Malaysia.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
