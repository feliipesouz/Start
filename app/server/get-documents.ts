import "server-only";

import { db, getDownloadURLFromPath } from "../lib/firebase";

type SavedImagesType = {
  id: string;
  uploadPaths: string[];
  name: string;
};

export async function getDocumentsData(link: string) {
  console.log('link: ', link);
  const docs = db.collection("saved-images").doc(link);

  const docSnapshot = await docs.get();
  console.log('docSnapshot: ', docSnapshot);

  if (!docSnapshot.exists) {
    // Se não encontrar o documento com o link informado
    console.error('Documento não encontrado');
    return undefined;
  }

  const data = docSnapshot.data() as SavedImagesType;
  console.log(data);

  const uploadUrls = await Promise.all(
    data.uploadPaths.map(async (path) => {
      const url = await getDownloadURLFromPath(path);
      return url;
    })
  );

  return { ...data, uploadUrls }; // Retornando os dados do documento com as URLs
}
