# Privacy Analysis

- **Threat model**: on-chain observer, curious backend, network adversary.
- **Protection**: FHE ensures backend sees only ciphertexts. On-chain sees only total.
- **K-anonymity**: Batch size 10 → anonymity set size = 10.
- **Leakage**: Timing correlation possible; mitigated by batch windows.
- **Key compromise**: In production, use threshold FHE; here, single key.
