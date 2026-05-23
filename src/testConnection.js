import client from "./chroma.js";

async function test() {
  const heartbeat = await client.heartbeat();

  console.log("Connected to ChromaDB");
  console.log("Heartbeat:", heartbeat);
}

test();