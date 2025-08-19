import express from "express";
import bodyParser from "body-parser";
import { encryptIntent, aggregateCiphertexts, decryptTotal } from "./fhe_worker";

type Intent = { id: string; address: string; ciphertext: string };

const app = express();
app.use(bodyParser.json());

const BATCH_SIZE = 10;
let queue: Intent[] = [];
let batchId = 1;

app.post("/intents", async (req, res) => {
  const intent: Intent = req.body;
  queue.push(intent);
  if (queue.length >= BATCH_SIZE) await processBatch();
  res.json({ ok: true });
});

async function processBatch() {
  const batch = queue.splice(0, BATCH_SIZE);
  const ciphers = batch.map((i) => i.ciphertext);
  const agg = await aggregateCiphertexts(ciphers);
  const total = await decryptTotal(agg);
  console.log(`Batch ${batchId}: total = ${total} USDC`);
  batchId++;
}

app.get("/simulate", async (_req, res) => {
  for (let i = 0; i < BATCH_SIZE; i++) {
    const c = await encryptIntent(10 + i);
    await fetch("http://localhost:3000/intents", {
      method: "POST",
      body: JSON.stringify({ id: `u${i}`, address: `0xuser${i}`, ciphertext: c }),
      headers: { "Content-Type": "application/json" },
    });
  }
  res.json({ ok: true, msg: "10 intents submitted" });
});

app.listen(3000, () => console.log("Aggregator running at http://localhost:3000"));
