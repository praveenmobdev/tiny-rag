import client from "./chroma.js";
import embedDocument from "./embedChunks.js";

async function store(path) {
  const collection = await client.getOrCreateCollection({
    name: "tiny-rag",
    embeddingFunction: null,
  });

  const chunks = await embedDocument(path);

  await collection.add({
    ids: chunks.map(chunk => chunk.id),

    documents: chunks.map(chunk => chunk.document),

    embeddings: chunks.map(chunk => chunk.embedding),

    metadatas: chunks.map(chunk => chunk.metadata),
  });

  console.log("Stored in ChromaDB");
}

store("./docs/react.txt");
store("./docs/rag.txt");