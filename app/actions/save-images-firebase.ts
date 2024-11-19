"use server";

import { Buffer } from "buffer"; // Import Buffer to handle ArrayBuffer

// Import your Firebase Admin SDK initialized in another module
import { db, storage } from "../lib/firebase";

export async function saveImagesOnFirebase(formData: FormData, id: string) {

  try {
    let files: File[] = [];

    formData.forEach((value, key) => {
      if (key.startsWith("file-")) {
        const file = value as File;
        files.push(file);
      }
    });
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const destinatario = formData.get("destinatario") as string;
    const data = formData.get("data") as string;
    const proximidade = formData.get("proximidade") as string;
    const mensagem = formData.get("mensagem") as string;
    const videoLink = formData.get("videoLink") as string;
    const plano = formData.get("plano") as string;
    

    const uploadPromises = files.map(async (file, index) => {
      const storageRef = storage.file(`saved-images/${id}/${index}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
      await storageRef.save(buffer);
      return storageRef.name; // Return the file path for storage
    });

    const uploadPaths = await Promise.all(uploadPromises);

    const documentToSave = {
      id: id,
      nome,
      email,
      destinatario,
      data,
      proximidade,
      mensagem,
      videoLink,
      plano,
      uploadPaths, // Caminhos das imagens
    };

    const docRef = db.collection("saved-images").doc(documentToSave.id); // Use collection and doc in Admin SDK
    await docRef.set(documentToSave);

    return documentToSave.id;
  } catch (error) {
    console.error("Error saving images:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
