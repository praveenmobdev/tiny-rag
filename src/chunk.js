function chunkText(text, chunkSize = 300, source = "unknown") {
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push({
      chunkId: `${source}-chunk-${chunks.length}`,
      source,
      text: text.slice(i, i + chunkSize),
    });
  }

  return chunks;
}

export default chunkText;