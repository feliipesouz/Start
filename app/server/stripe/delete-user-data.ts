import { db, storage } from "@/app/lib/firebase";

/**
 * Função para deletar dados do usuário tanto no Firestore quanto no Storage.
 * @param {string} userId - O ID do usuário a ser deletado.
 */
export async function deleteUserData(userId: string) {
    try {
        // Referência ao documento do Firestore
        const docRef = db.collection("saved-images").doc(userId);

        // Verifique se o documento existe
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            console.error(`Documento com ID ${userId} não encontrado no Firestore.`);
            return;
        }

        // Exclui o documento do Firestore
        await docRef.delete();
        console.log(`Documento com ID ${userId} deletado do Firestore.`);

        // Define o prefixo da pasta no Storage
        const prefix = `saved-images/${userId}/`;

        // Lista todos os arquivos na pasta do usuário
        const [files] = await storage.getFiles({ prefix });

        // Exclui cada arquivo individualmente
        for (const file of files) {
            await file.delete();
            console.log(`Arquivo ${file.name} deletado do Storage.`);
        }

        console.log(`Todos os arquivos da pasta ${prefix} foram deletados.`);

    } catch (error) {
        console.error("Erro ao deletar dados do usuário:", error);
        throw new Error("Falha ao deletar dados do usuário");
    }
}
