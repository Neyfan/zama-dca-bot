# Setup

### Prereqs
- Node.js 18+
- Hardhat (for contracts)
- (Optional) Rust if testing TFHE-rs

### Steps
```bash
git clone https://github.com/<your-org>/zama-dca-bot
cd zama-dca-bot

# install backend
cd backend
npm install

# generate keys
../scripts/keygen.sh

# run backend
npm run dev

# simulate 10 users
curl http://localhost:3000/simulate

---

## 📄 docs/submission.md

```markdown
# Submission README

**Repository**: https://github.com/<your-org>/zama-dca-bot  
**Demo video**: https://youtu.be/<your-demo-video>  
**Contracts**: BatchRouter.sol (deployable to Sepolia)  
**Docs**: https://github.com/<your-org>/zama-dca-bot/tree/main/docs  

### Short description
Privacy-preserving DCA Bot using Zama FHEVM. Collects encrypted user intents, aggregates them into batches (≥10 users), executes a single USDC→ETH swap, and distributes ETH proportionally. Only batch totals are revealed on-chain. Repo includes contracts, backend, docs, and demo simulation.

