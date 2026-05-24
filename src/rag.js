import ollama from "ollama";
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
    host: "localhost",
    port: 8000
});

const collection = await client.getCollection({
    name: "tiny-rag"
});

async function retrieve(query, nResults = 3) {

    // Convert query to embedding

    const embeddingResponse = await ollama.embeddings({
        model: "nomic-embed-text",
        prompt: query
    });

    const queryEmbedding = embeddingResponse.embedding;

    // Search vector DB

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults
    });

    return results.documents[0];
}

async function ask(query) {

    console.log("\n============================");
    console.log("QUESTION:");
    console.log(query);

    // STEP 1: Retrieve relevant chunks

    const documents = await retrieve(query);

    // STEP 2: Combine chunks into context

    const context = documents.join("\n\n");

    console.log("\n============================");
    console.log("RETRIEVED CONTEXT:");
    console.log(context);

    // STEP 3: Build RAG prompt

    const prompt = `
You are a helpful AI assistant.

Answer the question ONLY using the provided context.

If the answer is not in the context, say:
"I could not find the answer in the provided context."

Context:
${context}

Question:
${query}

Answer:
`;

    console.log("\n============================");
    console.log("GENERATING ANSWER...");
    console.log("============================\n");

    // STEP 4: Generate answer using LLM

    const response = await ollama.chat({
        model: "llama3",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

    // STEP 5: Print final answer

    console.log(response.message.content);
}

// TESTS

await ask("What is React state?");
await ask("What are embeddings?");
await ask("How does RAG work?");