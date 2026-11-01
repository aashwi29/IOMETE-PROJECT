/**
 * Content and Knowledge Base for IOMETE Sovereign Architecture & Decision Explorer
 * Sourced from IOMETE documentation, architecture whitepapers, and industry benchmarks.
 */

export const MENTAL_MODEL_CONCEPTS = {
  title: "The 'Two-Room House' Mental Model",
  tagline: "Total data sovereignty without sacrificing the convenience of modern SaaS.",
  analogy: {
    room1: {
      name: "Room 1: The Sovereign Vault (Your Data Plane)",
      location: "Inside Customer's Private VPC / Cloud Account (AWS, Azure, GCP, or On-Prem)",
      role: "Where your data lives, stays, and is processed. Never leaves your perimeter.",
      components: [
        {
          name: "Customer Object Storage",
          tech: "Amazon S3 / Azure ADLS Gen2 / Google Cloud Storage / MinIO",
          description: "Raw Parquet files formatted with Apache Iceberg. Encrypted with your own KMS customer-managed keys."
        },
        {
          name: "Elastic Compute Engine",
          tech: "Apache Spark on Kubernetes (EKS / AKS / GKE / On-prem K8s)",
          description: "Runs queries, ETL transformations, and AI/ML workloads inside your VPC using your own cloud compute and negotiated rates."
        },
        {
          name: "Local Iceberg Metadata Catalog",
          tech: "Apache Iceberg Catalog / Hive Metastore",
          description: "Tracks table snapshots, ACID transaction logs, partition manifests, and time-travel history locally."
        },
        {
          name: "Zero Outbound Data Flow",
          tech: "Egress-Free Architecture",
          description: "Query results go directly to your BI tools (PowerBI, Tableau, Superset) or SQL clients. Zero bytes of query results ever touch IOMETE servers."
        }
      ]
    },
    room2: {
      name: "Room 2: The Control Tower (IOMETE Control Plane)",
      location: "Managed SaaS by IOMETE (or Dedicated Private VPC Deployment)",
      role: "Where orchestration, governance policies, and management UI reside.",
      components: [
        {
          name: "Centralized Management UI",
          tech: "Web Console & Data Workspace",
          description: "Intuitive interface for SQL editing, catalog exploration, job monitoring, access requests, and cluster scaling."
        },
        {
          name: "Unified RBAC & Governance Engine",
          tech: "Role & Attribute Based Access Control (RBAC/ABAC)",
          description: "Define fine-grained column masking, row-level filtering, and user permissions pushed down to the local Spark engines."
        },
        {
          name: "Cluster & Job Orchestrator",
          tech: "Kubernetes Operator & Scheduler",
          description: "Automates zero-downtime cluster provisioning, auto-scaling to zero, and scheduled pipeline orchestration."
        },
        {
          name: "Zero-Knowledge Telemetry",
          tech: "Encrypted Heartbeat & Metrics",
          description: "Receives ONLY operational health telemetry (cluster status, query run durations, CPU/memory utilization). NEVER customer data."
        }
      ]
    }
  },
  keyTakeaway: "Unlike traditional SaaS (where you hand over your data to the vendor's storage and compute), IOMETE brings the software to your data. You retain 100% data custody."
};

export const QUERY_SIMULATION_STEPS = [
  {
    step: 1,
    title: "1. Query Submission",
    actor: "End-User / BI Tool (Tableau, dbt, Superset)",
    plane: "customer",
    description: "Analyst runs a query: `SELECT customer_id, SUM(amount) FROM payments GROUP BY 1`. The query connects via JDBC/ODBC directly to the Spark SQL endpoint inside the customer's VPC.",
    dataExposedToIOMETE: "None. Direct VPC connection."
  },
  {
    step: 2,
    title: "2. Policy & Token Validation",
    actor: "IOMETE Agent & Local Spark Engine",
    plane: "hybrid",
    description: "The engine validates user identity and retrieves cached access policies (row filters, column masks). Policy tokens are verified cryptographically.",
    dataExposedToIOMETE: "Authentication handshake only. No data."
  },
  {
    step: 3,
    title: "3. Iceberg Metadata Scan & Pruning",
    actor: "Apache Iceberg Catalog in Customer VPC",
    plane: "customer",
    description: "Spark queries the Iceberg metadata tree (manifest lists and manifests) to identify the exact Parquet files needed, skipping 95%+ of irrelevant files via partition and min/max statistics.",
    dataExposedToIOMETE: "None. All metadata operations happen in customer cloud."
  },
  {
    step: 4,
    title: "4. Distributed In-VPC Compute Execution",
    actor: "Spark Worker Pods on Customer Kubernetes",
    plane: "customer",
    description: "Worker pods read encrypted Parquet files directly from your S3/ADLS bucket using customer-managed IAM roles and KMS keys. Memory-mapped parallel aggregation occurs in-cluster.",
    dataExposedToIOMETE: "None. Raw data remains strictly in your VPC memory."
  },
  {
    step: 5,
    title: "5. Direct Result Delivery",
    actor: "Local Spark SQL Endpoint -> BI Tool",
    plane: "customer",
    description: "Aggregated query results stream directly back to the analyst's dashboard or dbt runner over secure internal TLS. No egress fees to IOMETE.",
    dataExposedToIOMETE: "Zero bytes of result set."
  },
  {
    step: 6,
    title: "6. Operational Telemetry Only",
    actor: "IOMETE Control Plane Heartbeat",
    plane: "control",
    description: "The cluster emits a 1KB operational heartbeat to the IOMETE Control Plane: `QueryID: q-8492, Duration: 1.4s, RowsRead: 450,000, NodesUsed: 4, Status: SUCCESS`.",
    dataExposedToIOMETE: "Metadata & metrics only (runtime, execution time). Customer records never leave."
  }
];

export const ROLE_PERSONAS = [
  {
    id: "ciso",
    title: "Chief Information Security Officer (CISO)",
    badge: "Security & Compliance",
    coreQuestion: "Can IOMETE, cloud sub-processors, or external attackers access our sensitive customer data?",
    executiveSummary: "IOMETE operates on a Zero-Data-Access architecture. Your raw data and query execution never leave your private VPC or cloud perimeter. We eliminate third-party data processor exposure and third-party data breaches.",
    proofPoints: [
      {
        title: "100% In-VPC Execution (Data Plane Isolation)",
        detail: "Storage buckets (S3/ADLS/GCS) and compute nodes (EKS/AKS/GKE) are hosted within your enterprise boundary. No raw data is ever replicated or transferred to IOMETE infrastructure."
      },
      {
        title: "Customer-Managed KMS Encryption",
        detail: "Data at rest is encrypted with your own AWS KMS, Azure Key Vault, or GCP KMS keys. IOMETE never holds your cryptographic master keys."
      },
      {
        title: "Simplified Compliance (HIPAA, SOC2, GDPR, PCI-DSS)",
        detail: "Because data never transits third-party SaaS servers, compliance scopes shrink drastically. No need for complex cross-border Data Processing Agreements (DPAs) for lakehouse storage."
      },
      {
        title: "Granular Row- & Column-Level Dynamic Masking",
        detail: "Built-in RBAC/ABAC engine ensures sensitive PII/PHI is masked in real-time before analysts ever see results, enforced directly by the Spark engine."
      }
    ],
    incumbentFriction: {
      snowflake: "Requires copying all data into Snowflake's proprietary multi-tenant micro-partition storage, introducing third-party SaaS breach surface and complex compliance audit overhead.",
      databricks: "While Databricks has customer VPC storage options, their managed control plane and proprietary runtime create deep vendor coupling and operational complexity."
    },
    elevatorPitch: "With IOMETE, your data stays in your castle behind your moat. We provide the crown jewels' dashboard without ever holding a single gold coin."
  },
  {
    id: "cfo",
    title: "Chief Financial Officer (CFO) / VP of Finance",
    badge: "Cost & Predictability",
    coreQuestion: "Why is our cloud data warehouse bill exploding 40% year-over-year, and how does IOMETE stop it?",
    executiveSummary: "Traditional SaaS warehouses charge a 3x to 5x markup on top of raw cloud compute and invent proprietary 'credit' units that make budgeting impossible. IOMETE eliminates the markup and decouples software from compute, cutting lakehouse TCO by 70% to 85%.",
    proofPoints: [
      {
        title: "Zero Proprietary Compute Markup",
        detail: "You pay raw infrastructure directly to your cloud provider (AWS, Azure, GCP), leveraging your existing Enterprise Discount Programs (EDP) and Reserved / Spot Instances."
      },
      {
        title: "Predictable, Flat Software Licensing",
        detail: "No 'credit burnout' or surprise month-end bills when a junior analyst accidentally runs an unindexed query. You pay a transparent, predictable software subscription."
      },
      {
        title: "Auto-Scale to Zero (No Idle Waste)",
        detail: "Compute clusters spin down completely when idle. Unlike warehouses that round up or keep minimum warm instances burning money, IOMETE Kubernetes operator frees resources immediately."
      },
      {
        title: "Zero Cross-Cloud Egress Fees",
        detail: "Because data processing is colocated with your data lake buckets, you avoid the punitive outbound network egress charges associated with pushing gigabytes to external SaaS endpoints."
      }
    ],
    incumbentFriction: {
      snowflake: "Black-box credit pricing ($2-$4/credit) designed to consume budget rapidly; auto-suspend has minimum billable blocks; 300%+ markup over raw EC2.",
      databricks: "DBU (Databricks Unit) licensing billed on top of raw compute, resulting in dual billing streams that compound as ingestion volumes grow."
    },
    elevatorPitch: "Stop paying SaaS vendors a 400% markup on standard AWS compute. IOMETE gives you enterprise warehouse performance at raw cloud cost plus a flat software fee."
  },
  {
    id: "data-lead",
    title: "Head of Data / Chief Data Architect",
    badge: "Architecture & Freedom",
    coreQuestion: "Will my team get locked into proprietary SQL dialects and formats? How hard is this to maintain?",
    executiveSummary: "IOMETE is built on open standards: Apache Iceberg table format and Apache Spark compute engine. You own your data in open Parquet files. If you ever leave, your data is already in the industry-standard format queryable by any engine.",
    proofPoints: [
      {
        title: "100% Apache Iceberg Open Table Format",
        detail: "Full ACID transactions, schema evolution, partition evolution, and time-travel snapshots. Zero proprietary storage lock-in. Query the exact same files with Trino, DuckDB, or Athena."
      },
      {
        title: "Battle-Tested Apache Spark Performance",
        detail: "State-of-the-art vectorized query execution and memory management. Handles both high-throughput batch ETL/ELT pipelines and low-latency interactive SQL queries."
      },
      {
        title: "Modern Data Stack Integration",
        detail: "Native connectors for dbt (dbt-iomete), Apache Airflow, Superset, Metabase, Tableau, PowerBI, and Python/Jupyter data science workflows."
      },
      {
        title: "Automated Kubernetes Lifecycle",
        detail: "No need for a dedicated K8s SRE team. IOMETE's Control Plane provisions, patches, monitors, and auto-tunes Spark worker pods on your cluster automatically."
      }
    ],
    incumbentFriction: {
      snowflake: "Proprietary FDN micro-partitions. Extracting 50TB of data out of Snowflake requires costly UNLOAD statements, egress penalties, and months of refactoring.",
      databricks: "Delta Lake ecosystem, while partially open, relies heavily on proprietary Databricks Photon engine features to achieve advertised speeds, creating operational stickiness."
    },
    elevatorPitch: "Build your modern lakehouse on Apache Iceberg and Spark without hiring 5 platform engineers to manage it. No lock-in, no proprietary walls, pure open standard freedom."
  },
  {
    id: "compliance",
    title: "Data Governance & Compliance Lead",
    badge: "Governance & Residency",
    coreQuestion: "How do we comply with strict local data residency laws and satisfy rigorous audit requirements?",
    executiveSummary: "With global regulations like GDPR (EU), DPDPA (India), Saudi PDPL, and HIPAA (US), data localization is non-negotiable. IOMETE guarantees geographic residency because data never leaves your selected cloud region or private data center.",
    proofPoints: [
      {
        title: "Guaranteed Data Localization",
        detail: "Your data stays in Frankfurt, Mumbai, Riyadh, or Ohio—wherever your cloud bucket sits. No risk of accidental cross-border telemetry replication."
      },
      {
        title: "Comprehensive Immutable Audit Logs",
        detail: "Complete visibility into who queried what table, what columns were accessed, when filters were triggered, and session origin IPs."
      },
      {
        title: "Centralized Data Catalog & Tagging",
        detail: "Tag PII, financial data, and confidential IP across all datasets. Enforce automated governance policies universally across all BI and ad-hoc query tools."
      },
      {
        title: "Separation of Duties",
        detail: "Security admins define access policies; data engineers build pipelines; business analysts query. No single person has unchecked access to infrastructure and data."
      }
    ],
    incumbentFriction: {
      snowflake: "Multi-tenant cloud architecture requires trust in vendor's internal tenant isolation and third-party region compliance certificates.",
      databricks: "Data governance (Unity Catalog) requires centralizing metadata in Databricks-managed infrastructure, complicating air-gapped or hyper-local requirements."
    },
    elevatorPitch: "Guaranteed geographical residency and frictionless compliance. When auditors ask where your customer records are, point to your own cloud bucket."
  }
];

export const TRADEOFF_COMPARISON = {
  pillars: [
    {
      category: "Data Custody & Location",
      iomete: {
        score: "Superior (10/10)",
        status: "best",
        text: "100% In-VPC / Sovereign. Raw data and query execution never leave your cloud account or private infrastructure."
      },
      snowflake: {
        score: "SaaS Multi-tenant (5/10)",
        status: "risk",
        text: "Vendor-hosted. Data must be ingested into Snowflake-managed cloud accounts and proprietary storage."
      },
      databricks: {
        score: "Hybrid VPC (7/10)",
        status: "warning",
        text: "Data in customer cloud bucket, but control plane and managed runtimes maintain deep access hooks."
      },
      diy: {
        score: "100% In-VPC (10/10)",
        status: "best",
        text: "100% customer custody, but requires building and maintaining all security, RBAC, and catalog plumbing from scratch."
      }
    },
    {
      category: "Cost & Markup",
      iomete: {
        score: "Raw Cloud + Flat Software",
        status: "best",
        text: "Zero compute markup. Use your cloud EDP discounts + Spot/Reserved instances. 70-85% lower TCO than SaaS warehouses."
      },
      snowflake: {
        score: "3x-5x Markup + Credits",
        status: "risk",
        text: "Proprietary credit currency ($2-$4/credit). High compute markup over underlying AWS/Azure instances."
      },
      databricks: {
        score: "Dual Billing (DBU + Cloud)",
        status: "warning",
        text: "DBU charge layered on top of cloud compute costs. Substantial markup on Photon / high-concurrency clusters."
      },
      diy: {
        score: "Raw Cloud Cost Only",
        status: "warning",
        text: "Zero software fee, BUT high hidden headcount cost: 2-4 full-time platform/K8s engineers required ($400k-$800k/yr)."
      }
    },
    {
      category: "Table & Storage Format",
      iomete: {
        score: "100% Open (Apache Iceberg)",
        status: "best",
        text: "Industry-standard Apache Iceberg on Parquet. Zero exit cost. Query directly with Spark, Trino, Athena, DuckDB."
      },
      snowflake: {
        score: "Proprietary Micro-partitions",
        status: "risk",
        text: "Locked in proprietary format. (Iceberg support available as secondary feature with performance limitations and high egress)."
      },
      databricks: {
        score: "Delta Lake",
        status: "neutral",
        text: "Open-source Delta Lake, but optimal performance requires proprietary Databricks Photon runtime and Unity Catalog."
      },
      diy: {
        score: "Open (Iceberg / Delta / Hudi)",
        status: "best",
        text: "Pure open source, but catalog synchronization, table compaction, and maintenance must be manually scripted."
      }
    },
    {
      category: "Operational Overhead",
      iomete: {
        score: "Low (SaaS Experience)",
        status: "best",
        text: "Fully managed control plane with automated Kubernetes operator. No manual Spark cluster tuning needed."
      },
      snowflake: {
        score: "Zero (Pure Serverless)",
        status: "best",
        text: "Zero infrastructure management. Complete hands-off convenience (the primary reason teams choose Snowflake)."
      },
      databricks: {
        score: "Medium",
        status: "neutral",
        text: "Requires cluster sizing, runtime configuration, and workspace management, though managed workflows help."
      },
      diy: {
        score: "Extremely High",
        status: "risk",
        text: "Manual Kubernetes management, Spark executor tuning, out-of-memory debugging, security patching, and monitoring."
      }
    },
    {
      category: "Vendor Lock-In Risk",
      iomete: {
        score: "Near Zero",
        status: "best",
        text: "No data unloading needed. All tables remain in your S3/ADLS bucket in standard Iceberg format. Leave anytime."
      },
      snowflake: {
        score: "High Lock-In",
        status: "risk",
        text: "Massive friction to migrate petabytes out. Requires continuous UNLOAD queries, network egress fees, and schema rebuilds."
      },
      databricks: {
        score: "Medium-High Lock-In",
        status: "warning",
        text: "Pipelines written in proprietary Databricks runtime notebooks and Unity Catalog require non-trivial migration."
      },
      diy: {
        score: "Zero Vendor Lock-In",
        status: "best",
        text: "Completely open source, but team is locked into their own custom legacy scripts and knowledge silos."
      }
    }
  ],
  whenToChoose: {
    chooseIomete: [
      "You have strict data sovereignty, compliance (HIPAA/GDPR/Gov), or Zero-Trust mandates preventing raw data in SaaS.",
      "Your Snowflake or Databricks monthly bill has spiraled out of control due to compute markups and opaque credits.",
      "You have 10TB+ to multi-petabyte datasets where paying 3x compute markup is financially irresponsible.",
      "You want full ownership of your data lakehouse using Apache Iceberg without hiring a dedicated K8s platform engineering team.",
      "You already have cloud infrastructure (AWS/Azure/GCP) or on-prem Kubernetes and want to maximize negotiated EDP discounts."
    ],
    chooseSnowflake: [
      "You are a small early-stage startup (<1TB data) with zero DevOps or cloud infrastructure expertise.",
      "You want 100% turnkey hands-off serverless data warehousing and don't care about cloud compute markups or proprietary formats.",
      "Your team only writes standard ANSI SQL for small dashboard reporting and has no Spark, Python, or lakehouse requirements."
    ],
    chooseDatabricks: [
      "Your primary workload is heavy machine learning/deep learning research tightly integrated with MLflow and proprietary LLM suites.",
      "You have already standardized your entire enterprise on Azure Databricks or AWS Databricks with massive pre-committed spend."
    ],
    chooseDIY: [
      "You have an army of 10+ distributed systems and Kubernetes infrastructure engineers with budget to maintain open source Spark/Trino.",
      "You require completely air-gapped, zero-internet on-premise military infrastructure where no external SaaS control plane can connect."
    ]
  }
};

export const SALES_PRECALL_KNOWLEDGE = {
  industries: [
    {
      id: "fintech",
      name: "Financial Services & FinTech",
      primaryPain: "PCI-DSS compliance, sovereign banking regulations, and massive Snowflake query costs for transaction ledger analysis.",
      triggerEvents: ["Rapid transaction volume growth", "Upcoming security audit / SOC2 Type II renewal", "Executive mandate to cut AWS/Snowflake spend by 30%"],
      objections: [
        {
          objection: "Our security team won't allow any third-party SaaS tool to connect to our infrastructure.",
          rebuttal: "That's precisely why FinTechs choose IOMETE. Our Data Plane runs 100% inside your private VPC. IOMETE never touches your database credentials, master keys, or transaction records. Only operational telemetry flows to our control plane.",
          proofPoint: "Financial institutions deploy IOMETE to keep all transaction and ledger data within their sovereign VPC while cutting warehouse spend by up to 75%."
        },
        {
          objection: "Is Spark fast enough for real-time fraud analysis and sub-second executive dashboards?",
          rebuttal: "IOMETE utilizes vectorized Spark query execution with Apache Iceberg metadata pruning, which skips up to 98% of unnecessary Parquet files. Combined with intelligent caching, query latencies match traditional warehouses at a fraction of the cost.",
          proofPoint: "Iceberg's partition evolution and file-level min/max statistics deliver sub-second performance on billion-row financial datasets."
        }
      ],
      discoveryQuestions: [
        "What percentage of your cloud data warehouse bill is spent on compute markup versus raw storage?",
        "How many weeks does your compliance and security team spend reviewing new SaaS data processors because of data residency concerns?",
        "If an auditor asked today to verify that zero customer financial records leave your VPC, can your current warehouse architecture prove that?"
      ]
    },
    {
      id: "healthcare",
      name: "Healthcare, Life Sciences & HealthTech",
      primaryPain: "HIPAA Protected Health Information (PHI), patient data residency, and high compute costs for genomic/clinical data processing.",
      triggerEvents: ["Expanding clinical trials / patient datasets", "HIPAA compliance audit", "High egress fees transferring clinical data to third-party clouds"],
      objections: [
        {
          objection: "We cannot sign Business Associate Agreements (BAAs) that allow vendor access to patient health records.",
          rebuttal: "With IOMETE, you don't have to grant vendor data access because IOMETE has ZERO access to your PHI. All patient records remain in your encrypted S3/GCS buckets with your own KMS keys. IOMETE's Control Plane only sees job IDs and runtimes.",
          proofPoint: "Healthcare providers use IOMETE to run clinical analytics natively in their HIPAA-compliant AWS/GCP accounts without third-party data processor exposure."
        },
        {
          objection: "We already have petabytes of imaging and genomic data in S3. Migrating to another database is a non-starter.",
          rebuttal: "IOMETE requires zero data migration. We register your existing data lake files into Apache Iceberg in-place. You don't copy or unload anything—you simply point IOMETE to your existing bucket.",
          proofPoint: "In-place Iceberg catalog onboarding takes hours, not months, with zero cloud egress charges."
        }
      ],
      discoveryQuestions: [
        "How is your team currently handling HIPAA compliance when querying patient data across external SaaS platforms?",
        "What is the average cost and pipeline duration when processing large clinical/genomic datasets on your current platform?",
        "Would your CISO approve a modern lakehouse architecture if all compute and storage remained 100% inside your VPC?"
      ]
    },
    {
      id: "ecommerce",
      name: "E-Commerce, Retail & Consumer Tech",
      primaryPain: "Clickstream data explosion, seasonal spikes (Black Friday/Cyber Monday) causing massive Snowflake credit burnout, and need for open lakehouse analytics.",
      triggerEvents: ["Unpredictable warehouse bills during peak shopping seasons", "Transitioning from batch to near-real-time event streaming", "Desire to build ML recommendation models on raw lake data"],
      objections: [
        {
          objection: "Our data team doesn't have time to manage complex Kubernetes clusters or tune Spark memory parameters.",
          rebuttal: "You don't have to touch Kubernetes. IOMETE provides an automated SaaS control plane that handles pod scheduling, cluster auto-scaling, driver/executor sizing, and auto-suspend automatically. You get a SaaS experience with in-VPC control.",
          proofPoint: "Data engineering teams run IOMETE with zero dedicated Kubernetes DevOps engineers using our automated operator."
        },
        {
          objection: "We rely heavily on dbt and BI tools like Tableau and Superset. Will switching break our analyst workflows?",
          rebuttal: "Not at all. IOMETE has a native dbt-iomete adapter, standard JDBC/ODBC drivers, and direct integrations with Tableau, PowerBI, Superset, and Metabase. Your analysts write standard SQL with zero disruption.",
          proofPoint: "Full dbt compatibility allows companies to lift and shift their existing transformation models in days."
        }
      ],
      discoveryQuestions: [
        "How much does your warehouse spend fluctuate between regular months and peak promotional quarters like Q4?",
        "Are your data scientists forced to extract data out of your warehouse into Python environments because of proprietary warehouse limits?",
        "If you could run all your ETL and BI on open Apache Iceberg tables without paying a 400% compute markup, what would that save annually?"
      ]
    },
    {
      id: "saas",
      name: "B2B SaaS & High-Growth Tech",
      primaryPain: "Multi-tenant customer analytics, gross margin erosion caused by cloud data warehouse bills, and customer demands for dedicated/sovereign data hosting.",
      triggerEvents: ["Series B/C/D margin expansion targets", "Enterprise clients demanding European or On-Prem data residency", "Snowflake contract renewal negotiation"],
      objections: [
        {
          objection: "We are currently locked into a multi-year pre-commit contract with Snowflake/Databricks.",
          rebuttal: "Many customers start by offloading their most expensive heavy ETL, ingestion, and scheduled dbt batch workloads to IOMETE. By moving high-volume workloads to IOMETE in-VPC, you burn Snowflake credits 70% slower and avoid expensive contract overages.",
          proofPoint: "Hybrid lakehouse offloading allows SaaS firms to preserve pre-commits for light ad-hoc queries while slashing overall TCO immediately."
        },
        {
          objection: "What happens if IOMETE as a company disappears? Are we stranded?",
          rebuttal: "This is the core power of true sovereignty. IOMETE is built 100% on Apache Iceberg and Apache Spark. Your data files are open Parquet files in your own cloud bucket. If you ever leave, you can point open-source Trino or Athena at your exact tables on day one. Zero vendor lock-in.",
          proofPoint: "Zero-lock-in guarantee gives enterprise architectures perpetual insurance against vendor price hikes."
        }
      ],
      discoveryQuestions: [
        "What percentage of your cloud infrastructure COGS is consumed by your current analytics data warehouse?",
        "Do enterprise customers ever block deals because they don't want their data stored in a multi-tenant third-party SaaS cloud?",
        "How do you plan to handle contract renewal when your data volume doubles next year?"
      ]
    }
  ],
  incumbents: {
    snowflake: {
      name: "Snowflake",
      primaryVulnerability: "High 3x-5x compute markup, proprietary micro-partitions, unpredictable credit consumption, and data hosted in vendor perimeter.",
      killerQuestion: "When you renew your Snowflake contract, how much leverage do you actually have when your data is trapped in proprietary micro-partitions and credit costs scale linearly?",
      displacementStrategy: "Position IOMETE as the Sovereign Lakehouse alternative. Recommend moving high-volume ETL and raw ingestion to IOMETE first to prove 70%+ savings in 14 days."
    },
    databricks: {
      name: "Databricks",
      primaryVulnerability: "Double billing (DBU license + cloud compute), complex workspace sprawl, proprietary Photon runtime lock-in, and heavy operational baggage.",
      killerQuestion: "What is your effective hourly cost once you add Databricks DBUs on top of your AWS/Azure EC2 instances?",
      displacementStrategy: "Highlight IOMETE's clean flat software licensing and native Apache Iceberg architecture, eliminating DBU unpredictability and Photon proprietary locks."
    },
    cloudera: {
      name: "Cloudera / Legacy Hadoop",
      primaryVulnerability: "Aging on-prem HDFS hardware, immense administrative toil, inability to scale compute/storage independently, and lack of modern Iceberg/cloud native features.",
      killerQuestion: "How much engineering time is spent patching aging Hadoop nodes and keeping Hive metastores alive instead of delivering business value?",
      displacementStrategy: "Present IOMETE as the modern cloud-native or on-prem Kubernetes lakehouse upgrade path with instant S3/Iceberg support and zero Hadoop baggage."
    }
  }
};

export const TCO_BENCHMARK_DEFAULTS = {
  monthlySnowflakeSpend: 35000,
  dataVolumeTB: 45,
  dailyActiveComputeHours: 16,
  estimatedIometeComputeCost: 8400, // Raw cloud compute using spot/reserved
  estimatedIometeSoftwareCost: 2500, // Predictable IOMETE license
  calculateSavings: (currentSpend) => {
    // Typical IOMETE customer saves 65-80% compared to Snowflake/Databricks all-in spend
    const iometeTotal = Math.round(currentSpend * 0.28);
    const savings = currentSpend - iometeTotal;
    const percentage = Math.round((savings / currentSpend) * 100);
    return {
      iometeTotal,
      savings,
      percentage,
      annualSavings: savings * 12
    };
  }
};
