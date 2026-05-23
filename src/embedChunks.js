import fs from "fs/promises";
import ollama from "ollama";
import chunkText from "./chunk.js";

async function embedDocument(filePath) {
  const text = await fs.readFile(filePath, "utf-8");

  const chunks = chunkText(text, 300, filePath);

  const embeddedChunks = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const response = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: chunk.text,
    });

    embeddedChunks.push({
      id: chunk.chunkId,
      document: chunk.text,
      embedding: response.embedding,
      metadata: {
        source: chunk.source,
      },
    });

    console.log(`Embedded chunk ${i + 1}/${chunks.length}`);
  }

  return embeddedChunks;
}

export default embedDocument;