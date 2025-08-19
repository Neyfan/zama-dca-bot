# Zama Season 9 — Privacy-preserving DCA Bot (USDC → ETH)

Privacy-first DCA bot which collects encrypted user intents, aggregates them using FHE, executes a single batched swap on-chain and distributes purchased tokens proportionally.

## Quick links
- Design: [docs/design.md](docs/design.md)
- Privacy analysis: [docs/privacy_analysis.md](docs/privacy_analysis.md)
- How to run: [docs/setup.md](docs/setup.md)
- Submission README: [docs/submission.md](docs/submission.md)

## Features
- Client-side encrypted intents using FHE
- Aggregation of ≥10 intents before swap
- One aggregated swap (USDC→ETH) per batch
- Proportional distribution of tokens
- Documentation & CI included

## Run locally
```bash
cd backend
npm install
npm run dev
# open http://localhost:3000/simulate
