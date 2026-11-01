# Sovereign Architecture & Decision Explorer for IOMETE
> **"Complex technology is hard to explain, evaluate, and buy."**  
> An interactive web application built for the **hackCBS IOMETE Track** to demystify sovereign lakehouse architecture, eliminate buyer hesitation, and empower sales reps with high-impact deal intelligence.

[![Built for hackCBS](https://img.shields.io/badge/hackCBS-IOMETE_Track-blue.svg)](https://hackcbs.tech)
[![Built with ❤️ by noob coders](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-by%20noob%20coders-ff4081.svg)]()
[![React 18](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61dafb.svg)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS_v3-38bdf8.svg)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Build-Passing-emerald.svg)]()
[![License](https://img.shields.io/badge/License-Apache_2.0-orange.svg)]()

---

## 🌟 1. The Mission: Making Complex Technology Easy to Buy

Enterprise data teams today face a massive dilemma:
1. **The SaaS Convenience Trap:** Traditional cloud data warehouses (Snowflake, BigQuery, Databricks) offer hands-off convenience, but charge a **300% to 500% compute markup**, lock data into proprietary formats, and require copying sensitive customer records into multi-tenant vendor storage.
2. **The DIY Maintenance Nightmare:** Pure open-source lakehouses (Apache Iceberg, Apache Spark, Trino on Kubernetes) offer total sovereignty and low cost, but require hiring 3–5 dedicated platform engineers just to keep clusters alive and configure access policies.
3. **The Buyer Confusion Gap:** Enterprise buyers (CFOs, CISOs, Heads of Data) struggle to understand:
   - *What exactly is a "Sovereign Data Lakehouse"?*
   - *Where does our data actually live?*
   - *Can IOMETE or a rogue actor inspect our raw customer PII/PHI?*
   - *Why is our Snowflake bill growing 40% year-over-year while utilization is flat?*

**We did NOT build a clone of IOMETE.**  
Instead, we built the **Sovereign Architecture & Decision Explorer**—a purpose-built decision engine and sales enablement tool that bridges this gap, providing absolute architectural clarity, transparent trade-off analysis, and instant sales battlecards.

---

## 👥 2. Who It Helps

### A. The Enterprise Buyer
* **CISO & VP of Security:** Understands the **Zero-Data-Access** boundary, in-VPC isolation, customer-managed KMS encryption, and how IOMETE shrinks compliance audit scope (SOC2, HIPAA, GDPR).
* **CFO & VP of Finance:** Evaluates raw cloud compute economics, sees the breakdown of Snowflake's 4x markup, and simulates 70–85% TCO reduction using the interactive Lakehouse TCO Estimator.
* **Head of Data & Chief Data Architect:** Validates 100% open standards (Apache Iceberg on Parquet + Apache Spark), native dbt/Airflow integration, and zero vendor lock-in.
* **Data Governance & Compliance Lead:** Confirms geographic data residency guarantees (Frankfurt, Riyadh, Mumbai, etc.) and Apache Ranger-compatible column-level masking.

### B. The IOMETE Sales Rep & Solutions Architect
* **Instant Pre-Call Brief Generation:** Input a prospect's name, industry (FinTech, HealthTech, Retail, B2B SaaS), current incumbent (Snowflake, Databricks, Cloudera), and target persona to instantly generate:
  - 30-second conversational opening hook.
  - Sourced vulnerability analysis of their current stack.
  - Anticipated objections with counter-battlescripts and technical proof points.
  - 3 calibrated discovery questions that expose incumbent weaknesses.
  - A concrete 14-day in-VPC proof-of-concept (POC) closing call-to-action.
* **One-Click Export:** Instantly copy formatted briefs to Markdown, Slack, CRM notes, or Notion.

---

## 🏛️ 3. Architectural Overview & Mental Models

### The "Two-Room House" Mental Model
The core innovation of IOMETE is the clean separation of the **Data Plane** and the **Control Plane**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CUSTOMER'S PRIVATE VPC                          │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │           ROOM 1: THE SOVEREIGN VAULT (DATA PLANE)             │   │
│   │                                                                │   │
│   │  [ Customer KMS ] ──> [ S3 / ADLS / GCS Object Storage ]      │   │
│   │                             │  (Apache Iceberg / Parquet)      │   │
│   │                             ▼                                  │   │
│   │            [ Apache Spark Compute Cluster ]                    │   │
│   │                 (Customer Kubernetes Nodes)                    │   │
│   │                             │                                  │   │
│   │                             ▼ (TLS / Direct Result Stream)     │   │
│   │             [ Analyst Dashboard / BI Tools ]                   │   │
│   │             (Tableau, PowerBI, Superset, dbt)                  │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                 ▲                                      │
│                  Outbound-Only  │  1KB Encrypted                       │
│                  Heartbeat (443)│  Telemetry                           │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │ (NO CUSTOMER DATA EGRESS)
                                  ▼
    ┌───────────────────────────────────────────────────────────────┐
    │          ROOM 2: THE CONTROL TOWER (CONTROL PLANE)            │
    │               (Managed SaaS / Web Console)                    │
    │                                                               │
    │   • Central Management Web UI & SQL Editor                    │
    │   • Unified RBAC / ABAC Access Policy Pushdown                │
    │   • Kubernetes Cluster Operator & Auto-Scaler                 │
    │   • Zero-Knowledge Health Telemetry (Duration, CPU, Memory)   │
    └───────────────────────────────────────────────────────────────┘
```

#### What Stays in Room 1 (Customer VPC):
- **Raw Data Storage:** S3, Azure Data Lake Storage Gen2, Google Cloud Storage, or MinIO.
- **Table Metadata:** Apache Iceberg catalog, partition manifests, and snapshots.
- **Compute Executors:** Spark worker pods running on customer-managed Kubernetes (EKS, AKS, GKE, or bare metal).
- **Encryption Master Keys:** Customer-held AWS KMS, Azure Key Vault, or GCP KMS keys.
- **Query Results:** Streamed directly to internal BI tools or SQL clients. **Zero bytes ever flow to IOMETE.**

#### What Stays in Room 2 (IOMETE SaaS):
- **Management Console:** User interface for catalog discovery, SQL editor, and cluster health.
- **Orchestration:** Dispatches cluster start/stop instructions and job scheduling.
- **Governance Catalog:** Stores policy definitions pushed down locally to Spark engines.
- **Telemetry:** Receives **only** execution metadata (`QueryID`, `Duration`, `RowsRead`, `NodesUsed`). Customer records are cryptographically and physically unreachable.

---

## ⚡ 4. Interactive Application Features

| Feature | Description | Key User Benefit |
|---|---|---|
| **🏛️ Architecture Visualizer** | Interactive visual breakdown of Room 1 vs. Room 2 with network boundary specs and KMS details. | Instantly clarifies where data lives and why no raw data leaves the VPC. |
| **🔄 Interactive Query Tracer** | 6-step animated simulation tracing SQL queries from client submission to Iceberg metadata scan and direct result delivery. | Proves zero data exposure to IOMETE with live perimeter indicators. |
| **🎯 Role-Based Answer Engine** | Tailored dashboards for CISO, CFO, Head of Data, and Compliance Leads answering their burning questions with sourced evidence. | Eliminates cross-department communication friction; provides boardroom elevator pitches. |
| **⚖️ Trade-Off Matrix** | Honest multi-vector comparison of IOMETE vs. Snowflake vs. Databricks vs. DIY Lakehouse. | Helps buyers make confident decisions with an interactive 4-question fit assessment. |
| **💼 Sales Pre-Call Brief Generator** | Dynamic intelligence generator configuring industry, incumbent, and buyer persona. | Produces instant opening hooks, objection battlecards, and 3 killer discovery questions. |
| **💰 Lakehouse TCO Estimator** | Live slider calculating compute savings, EDP discount effects, and annual dollar impact. | Quantifies the 70–85% cost reduction achieved by eliminating proprietary compute markups. |

---

## 📊 5. Alignment with HackCBS Judging Criteria

| Criterion | Weight | How This Solution Delivers |
|---|---|---|
| **Practical Impact** | **35%** | Solves the primary sales bottleneck: enterprise deals stalling due to architectural confusion and fear of SaaS data leakage. Empowers sales reps to win against Snowflake/Databricks displacements in 14-day POCs. |
| **Buyer Clarity** | **25%** | Translates dense infrastructure jargon into intuitive mental models ("The Two-Room House"), persona-specific answer engines, and honest "When NOT to choose IOMETE" criteria. |
| **Technical Accuracy** | **25%** | Accurately models the exact technical mechanics of IOMETE: Apache Iceberg table format, Spark on Kubernetes, in-VPC data plane, KMS encryption, and zero-data-access control plane telemetry. |
| **Working Execution** | **15%** | Fully responsive, high-performance single-page web app built with React, Vite, Tailwind CSS, and Lucide icons. Production build tested with zero errors; ready for static deployment on Vercel or GitHub Pages. |

---

## 🚀 6. Setup & Local Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/iomete-sovereign-explorer.git

# 2. Navigate to the project directory
cd iomete-sovereign-explorer

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev
```

The app will be available at: **`http://localhost:3000`**

### Production Build & Static Export

```bash
# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

The build output will be generated in the `dist/` folder, ready for zero-config deployment to:
- **Vercel** (`vercel deploy`)
- **Netlify** (`netlify deploy --dir=dist`)
- **GitHub Pages** (via GitHub Actions or `gh-pages`)

---

## 📁 7. Project Directory Structure

```
iomete-sovereign-explorer/
├── public/
│   └── favicon.svg                   # Custom sovereign shield & lakehouse icon
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx               # Left sidebar navigation with vertical items & mobile drawer
│   │   ├── Navbar.jsx                # Re-export of Sidebar for legacy compatibility
│   │   ├── ArchitectureExplorer.jsx  # "Two-Room House" visualizer & query simulator
│   │   ├── UseCaseMatcher.jsx        # Role-based answer engine (CISO, CFO, Data Lead, Compliance)
│   │   ├── TradeOffMatrix.jsx        # Honest comparison vs Snowflake/Databricks/DIY
│   │   ├── SalesPreCallBrief.jsx     # Dynamic sales brief generator with battlecards
│   │   └── TcoCalculator.jsx         # Interactive Lakehouse TCO & savings estimator
│   ├── data/
│   │   └── content.js                # Structured knowledge base mapped to IOMETE docs
│   ├── App.jsx                       # Root application shell & routing
│   ├── main.jsx                      # Vite entry point
│   └── index.css                     # Tailwind directives, glowing accents & styles
├── index.html                        # HTML template with Google Fonts (Inter, JetBrains Mono)
├── package.json                      # Project dependencies & build scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS theme extensions & brand palette
├── vite.config.js                    # Vite bundler configuration
└── README.md                         # Comprehensive project documentation
```

---

## 📚 8. Sourced References & Concepts
- **IOMETE Architecture Docs:** [https://iomete.com/docs](https://iomete.com/docs)
- **Apache Iceberg Specification:** [https://iceberg.apache.org](https://iceberg.apache.org)
- **Zero-Trust Cloud Architecture:** Customer-managed KMS encryption, IAM role assumption, and outbound-only telemetry.
- **Cloud Economics:** Analysis of raw cloud compute (EC2/GCE/Azure VMs) vs. proprietary warehouse credits ($2–$4/credit).

---

<p align="center">
  <strong>built with ❤️ by noob coders</strong><br>
  Built for the <strong>hackCBS 2026 IOMETE Track</strong><br>
  <em>Empowering enterprise buyers with sovereign data ownership.</em>
</p>
