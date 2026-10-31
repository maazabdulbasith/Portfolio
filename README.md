# Abdul Basith Maaz — Engineering Portfolio & Interactive Demos

> Production portfolio and live interactive systems engineering demos for **Abdul Basith Maaz** (Backend & GenAI Engineer).  
> **Live Site:** [abdul-basith-maaz-portfolio.vercel.app](https://abdul-basith-maaz-portfolio.vercel.app/)

---

## ⚡ Interactive Engineering Demos

This repository hosts both the primary portfolio showcase and fully interactive, zero-stub client/edge engineering demos showcasing production GenAI, computer vision, and cryptographic systems.

### 1. [Shelf — Multi-Signal Hybrid Screenshot RAG Demo](https://abdul-basith-maaz-portfolio.vercel.app/demos/shelf)
*Route: `/demos/shelf`*

* **Architecture:** Multi-signal hybrid retrieval combining OCR full-text sparse search, dense text embeddings (`bge-small-en-v1.5`), and visual semantic embeddings (`clip-vit-base-patch32`) in `pgvector`.
* **Reciprocal Rank Fusion (RRF):** Implements ordinal rank fusion with smoothing constant $k=60$:
  $$\text{RRF Score}(d) = \sum_{m \in M} \frac{1}{60 + r_m(d)}$$
  Eliminates score normalization skew between disparate similarity spaces (BM25 vs. Cosine).
* **Grounding & Guardrails:**
  * **LlamaIndex Grounded Synthesizer:** Structured multi-source citation attribution directly linking answers to visual screenshot evidence.
  * **Deterministic Injection Defense:** Detects indirect and direct prompt injection attempts (`ignore previous instructions`, jailbreak signatures), returning explicit refusal code `prompt_injection`.
  * **Thin-Evidence Defense:** Rejects out-of-domain queries lacking sufficient token overlap with `thin_evidence` status code.
* **Dataset:** 38 authentic golden-set test screenshots with interactive drag-and-drop local file ingestion.

---

### 2. [AI Mock Interview — Real-Time Edge Behavioral Telemetry](https://abdul-basith-maaz-portfolio.vercel.app/demos/ai-interview)
*Route: `/demos/ai-interview`*

* **Client-Side Edge Inference:** Migrated facial landmark extraction from a 60-second server Celery queue to a 5-second client-side WebAssembly execution using Google MediaPipe (`FaceMesh` 468 landmarks).
* **Concurrency Mutex:** Implements a frame-processing queue mutex (`tracker.current.isProcessing`) preventing WebAssembly frame drift during 30 FPS video streaming.
* **Deterministic Behavioral Metrics (Zero Stubs):**
  * **Eye Contact Ratio:** Computed via 3D iris vector deviation relative to screen center.
  * **Head Yaw Angle:** Computed from eye-to-nose geometry ($| \theta_{\text{yaw}} | > 18^\circ$ flag).
  * **Smile Ratio & Expressiveness:** Measured via mouth corner Euclidean distance relative to lip height.
  * **Shannon Expression Entropy:** Rolling quantitative measurement of dynamic facial variance over 2-second windows.
* **LLM Synthesis:** Integrated with `gemini-2.5-flash` for qualitative evaluation, backed by an exact quantitative Behavioral Telemetry Synthesizer fallback.

---

### 3. [Wakat — ZATCA Phase 2 E-Invoicing Ledger & TLV Inspector](https://abdul-basith-maaz-portfolio.vercel.app/demos/wakat)
*Route: `/demos/wakat` | Live Product: [dev.wakat.me](https://dev.wakat.me)*

* **Cryptographic TLV QR Decoder:** Interactive byte-level parser for Saudi ZATCA Phase 2 tax authority QR codes, decoding standard 9-tag binary structures:
  1. Seller Name (UTF-8)
  2. VAT Registration Number
  3. Invoice Timestamp (ISO 8601)
  4. Invoice Total (with VAT)
  5. VAT Total Amount
  6. Hex-encoded SHA-256 XML Invoice Digest
  7. ECDSA Digital Signature
  8. Cryptographic Public Key
  9. X.509 Compliance Stamp Certificate
* **Hash-Chain Visualizer:** Demonstrates sequential cryptographic ledger integrity:
  $$\text{Invoice Hash}_n = \text{SHA-256}(\text{Invoice XML}_n \mathbin{\Vert} \text{Invoice Hash}_{n-1})$$
  Preventing retroactive invoice tampering or ledger deletion.

---

### 4. [Complia.in](https://complia.in)
*Live Product: [complia.in](https://complia.in)*

* AI-powered tax notice clarification engine decoding Indian GST (ASMT-10, DRC-01) and Income Tax notices into plain English with root-cause explanations and severity classifications.
* Multi-attribute search and keyword trigger indexing to resolve statutory deadlines and actionable mitigation checklists.

---

## 🛠 Tech Stack

* **Framework:** Next.js 14 (App Router, Server Actions, Route Handlers)
* **Language:** TypeScript 5 (Strict Mode)
* **Styling & Animation:** Tailwind CSS, Framer Motion, Lucide React
* **AI & Vision:** Google MediaPipe (FaceMesh WASM), Google Gemini 2.5 Flash API, LlamaIndex-style structured RAG
* **Deployment:** Vercel Edge / Serverless Runtime

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maazabdulbasith/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: All demos have client-side key overrides and deterministic rule engines, meaning the app runs completely out-of-the-box even without an API key).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Production Build:**
   ```bash
   npm run build
   ```

---

## 📄 License
MIT © [Abdul Basith Maaz](https://github.com/maazabdulbasith)
