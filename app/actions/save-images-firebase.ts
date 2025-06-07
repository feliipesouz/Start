"use server";

import { Buffer } from "buffer";

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
    const created_at = new Date().toISOString();


    const uploadPromises = files.map(async (file, index) => {
      const storageRef = storage.file(`saved-images/${id}/${index}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await storageRef.save(buffer);
      return storageRef.name;
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
      created_at,
      uploadPaths,
    };

    const docRef = db.collection("saved-images").doc(documentToSave.id);
    await docRef.set(documentToSave);

    return documentToSave.id;
  } catch (error) {
    console.error("Error saving images:", error);
    throw error;
  }
}
