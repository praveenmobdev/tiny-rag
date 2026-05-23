import client from "./chroma.js";

async function inspect() {
  const collection = await client.getCollection({
    name: "tiny-rag",
    embeddingFunction: null,
  });

  const results = await collection.get();

  console.log(JSON.stringify(results, null, 2));
}

inspect();