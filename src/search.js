import ollama from "ollama";
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
    host: "localhost",
    port: 8000
});

const collection = await client.getCollection({
    name: "tiny-rag"
});

async function search(query, nResults = 3) {

    console.log("\n============================");
    console.log("QUERY:");
    console.log(query);

    // Generate embedding for query

    const response = await ollama.embeddings({
        model: "nomic-embed-text",
        prompt: query
    });

    const queryEmbedding = response.embedding;

    console.log("\nEmbedding size:");
    console.log(queryEmbedding.length);

    // Query ChromaDB

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults
    });

    console.log("\n============================");
    console.log("TOP MATCHES");
    console.log("============================\n");

    results.documents[0].forEach((doc, index) => {

        const distance = results.distances[0][index];

        // Ignore weak matches

        if (distance > 0.7) {
            return;
        }

        const metadata = results.metadatas[0][index];

        console.log(`\nRESULT ${index + 1}`);
        console.log("=".repeat(50));

        console.log("DISTANCE:");
        console.log(distance);

        console.log("\nSOURCE:");
        console.log(metadata.source);

        console.log("\nTEXT:");
        console.log(doc);

        console.log("\n");
    });
}

// await search("What is React state?");
await search("React hooks");
await search("banana spaceship potato");