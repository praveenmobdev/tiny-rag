import ollama from "ollama";

async function getEmbedding(text) {
  const response = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: text
  });

  return response.embedding;
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (
    Math.sqrt(normA) * Math.sqrt(normB)
  );
}

async function run() {
  const react1 = await getEmbedding(
    "React updates the UI efficiently"
  );

  const react2 = await getEmbedding(
    "React re-renders components quickly"
  );

  const banana = await getEmbedding(
    "Bananas are yellow fruits"
  );

  const similarity1 = cosineSimilarity(
    react1,
    react2
  );

  const similarity2 = cosineSimilarity(
    react1,
    banana
  );

  console.log("\nReact vs React:");
  console.log(similarity1);

  console.log("\nReact vs Banana:");
  console.log(similarity2);
}

run();