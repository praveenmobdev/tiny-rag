**Project Overview**

This repository is a tiny Retrieval-Augmented Generation (RAG) demo that
illustrates how to: (1) chunk and embed text documents, (2) store embeddings
in a ChromaDB collection, and (3) run similarity searches against those
embeddings. It uses Ollama for embeddings and the ChromaDB client for a
vector database.

**Quick Summary**
- **Language:** JavaScript (ES modules)
- **Core libs:** `ollama` (embeddings), `chromadb` (vector DB)
- **Data:** two small sample docs under `docs/` (`react.txt`, `rag.txt`)

**Where to look**
- **Store / ingest:** [src/store.js](src/store.js#L1-L40)
- **Chunk + embed:** [src/embedChunks.js](src/embedChunks.js#L1-L200) and [src/chunk.js](src/chunk.js#L1-L50)
- **Direct embedding test:** [src/embed.js](src/embed.js#L1-L200)
- **Search / query:** [src/search.js](src/search.js#L1-L200)
- **Chroma client config:** [src/chroma.js](src/chroma.js#L1-L20)
- **Helpers / utilities:** [src/listCollections.js](src/listCollections.js#L1-L50), [src/inspect.js](src/inspect.js#L1-L50), [src/testConnection.js](src/testConnection.js#L1-L40)

**Architecture / Flow**
1. Documents in `docs/` are read by `src/embedChunks.js`.
2. `src/chunk.js` slices documents into fixed-size chunks (default 300 chars).
3. Each chunk is embedded via the Ollama client (`nomic-embed-text`).
4. The embedded chunks are stored into a ChromaDB collection called `tiny-rag`.
5. `src/search.js` embeds a text query with the same model and queries ChromaDB
   to return the most similar documents.

**Prerequisites**
- Node.js (v18+ recommended) and npm or yarn.
- A running Ollama instance locally with the `nomic-embed-text` model available.
  - See Ollama docs for installation and model management.
- A running ChromaDB server reachable at `localhost:8000` (the client in
  [src/chroma.js](src/chroma.js#L1-L20) is configured for this). You can run
  a local Chroma server or use a hosted endpoint; adapt `host`/`port`/`ssl`
  in `src/chroma.js` as needed.

**Install**
From the repository root:

```bash
npm install
```

**Populate (ingest) the sample docs into ChromaDB**
1. Ensure Ollama and Chroma services are running.
2. Run the store script which reads and embeds `docs/react.txt` and `docs/rag.txt`:

```bash
node src/store.js
```

You should see progress logs for embedded chunks and a final "Stored in ChromaDB" message.

**Querying / Search**
Once you have ingested embeddings, run the search script to see nearest-neighbor results:

```bash
node src/search.js
```

This will run two example queries (see file) and print the top matches with distances and metadata.

**Useful utilities**
- Test Chroma connection: `node src/testConnection.js`
- List collections: `node src/listCollections.js`
- Dump collection contents: `node src/inspect.js`

**Key configuration points**
- Change Chroma endpoint: edit [src/chroma.js](src/chroma.js#L1-L20).
- Change chunk size: edit the default in [src/chunk.js](src/chunk.js#L1-L20).
- Change embedding model (Ollama): update the `model` string in `src/embedChunks.js` and `src/embed.js`.

**Troubleshooting**
- "Connection refused" to Chroma: ensure Chroma server running on port 8000 or
  update `src/chroma.js` to point to the correct host/port.
- Ollama embedding errors: verify Ollama is running, the `nomic-embed-text`
  model is installed, and the Ollama daemon accepts embedding requests.
- If embeddings look wrong, check that both ingestion and query use the same
  embedding model and same preprocessing (chunking).

**Next steps / Improvements**
- Add CLI flags / scripts (`npm run ingest`, `npm run query`) for convenience.
- Add environment variable support for hosts/ports/models (via `dotenv`).
- Improve chunking to use sentence boundaries and overlap between chunks.
- Add unit tests and input validation.

**Files of interest**
- [src/store.js](src/store.js#L1-L40) — ingest pipeline driver.
- [src/embedChunks.js](src/embedChunks.js#L1-L200) — reads files, chunks, calls Ollama.
- [src/search.js](src/search.js#L1-L200) — query example and result printing.

If you want, I can:
- add `npm` scripts for ingest/query/test,
- add a simple CLI wrapper, or
- make config read from a `.env` file.

----

README created by an automated analysis script.
