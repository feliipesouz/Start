import { NextResponse } from 'next/server';
import { db, getDownloadURLFromPath } from '@/app/lib/firebase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Buscar o documento no Firebase Firestore usando o id da URL
  const docRef = db.collection('saved-images').doc(id);
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    return NextResponse.json({ error: 'Presente não encontrado' }, { status: 404 });
  }

  const data = docSnapshot.data();

  if (!data) {
    return NextResponse.json({ error: 'Sem dados disponíveis' }, { status: 404 });
  }

  const uploadUrls = await Promise.all(
    data.uploadPaths.map(async (path: string) => {
      const url = await getDownloadURLFromPath(path);
      return url;
    })
  );

  return NextResponse.json({ ...data, uploadUrls });
}
