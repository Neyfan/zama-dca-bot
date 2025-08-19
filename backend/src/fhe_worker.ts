export async function encryptIntent(amount: number): Promise<string> {
  return Buffer.from(JSON.stringify({ v: amount })).toString("base64");
}

export async function aggregateCiphertexts(ciphers: string[]): Promise<string> {
  let sum = 0;
  for (const c of ciphers) {
    sum += JSON.parse(Buffer.from(c, "base64").toString()).v;
  }
  return Buffer.from(JSON.stringify({ v: sum })).toString("base64");
}

export async function decryptTotal(agg: string): Promise<number> {
  return JSON.parse(Buffer.from(agg, "base64").toString()).v;
}
