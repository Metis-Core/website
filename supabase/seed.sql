-- =============================================================================
-- Metis Analytica — Seed data
-- Idempotent: safe to re-run. Uses `on conflict (slug) do update`.
-- =============================================================================

-- ---------------------------------- Services --------------------------------
insert into public.services (slug, layer, title, subtitle, description, icon, color, capabilities, industries, sort_order)
values
  ('data-infrastructure', 'Layer 1', 'Data Infrastructure & Architecture',
   'The foundation',
   'The foundation. We design, build, and deploy sovereign data architectures that scale with your institution.',
   'Storage', '#1976d2',
   array['Data audits & assessments','Cloud platform selection & setup','ETL pipelines & integrations','Database design & optimization','Data governance frameworks'],
   array['All sectors'], 1),
  ('data-solutions', 'Layer 2', 'Data Solutions & Systems Development',
   'Custom-built software',
   'Custom-built software systems that sit on top of your infrastructure, purpose-built for your exact workflows.',
   'Autorenew', '#dc004e',
   array['Bespoke data applications','Business process automation','Custom dashboards & reporting','Workflow orchestration','Integration platforms'],
   array['All sectors'], 2),
  ('data-custodianship', 'Layer 3', 'Data Custodianship & Managed Services',
   'Long-term stewardship',
   'We become the steward of your data. Long-term management, monitoring, support, and evolution of your data systems.',
   'SecurityOutlined', '#00897b',
   array['24/7 managed monitoring','Data quality assurance','Security & compliance management','Performance optimization','SLA-backed reliability','Team augmentation & training'],
   array['All sectors'], 3),
  ('analytics-intelligence', 'Layer 4', 'Analytics, Intelligence & Decision Support',
   'Data to decisions',
   'Transform raw data into institutional intelligence. Advanced analytics, forecasting, and decision support.',
   'AnalyticsOutlined', '#f57c00',
   array['Advanced analytics & BI','Predictive modeling & forecasting','AI/ML model development','Sector intelligence platforms','Policy & scenario modeling','Decision support systems'],
   array['All sectors'], 4)
on conflict (slug) do update set
  layer = excluded.layer,
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  icon = excluded.icon,
  color = excluded.color,
  capabilities = excluded.capabilities,
  industries = excluded.industries,
  sort_order = excluded.sort_order,
  is_active = true;

-- ---------------------------------- Products --------------------------------
insert into public.products (slug, title, subtitle, description, icon, color, features, link, sort_order)
values
  ('metis-database', 'Metis Database', 'Enterprise Data Platform',
   'A centralized, sovereign data repository designed for institutions. Metis Database unifies data from multiple sources into a single source of truth.',
   'Storage', '#737373',
   array['Multi-source data integration','Real-time synchronization','Scalable architecture','Advanced query optimization'],
   '/products/metis-database', 1),
  ('metis-security', 'Metis Security', 'Data Protection & Governance',
   'Enterprise-grade security framework embedded at every layer. Metis Security ensures your data is protected, compliant, and governed.',
   'SecurityOutlined', '#dc004e',
   array['End-to-end encryption','Role-based access control','Audit trails & compliance','Data residency management'],
   '/products/metis-security', 2),
  ('data-sharing', 'Metis Data Sharing', 'Secure Data Collaboration',
   'Enable secure, auditable data sharing across teams and departments. Metis Data Sharing maintains control while enabling collaboration.',
   'ShareOutlined', '#00897b',
   array['Granular permission controls','Secure data mesh architecture','Audit-ready collaboration','Cross-organizational sharing'],
   '/products/data-sharing', 3),
  ('metis-analytics', 'Metis Analytics', 'Intelligence & Insights',
   'Transform raw data into actionable intelligence. Metis Analytics provides real-time dashboards, predictive models, and decision support.',
   'Analytics', '#f57c00',
   array['Real-time dashboards','Predictive analytics','Custom reporting','AI-powered insights'],
   '/products/metis-analytics', 4)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  icon = excluded.icon,
  color = excluded.color,
  features = excluded.features,
  link = excluded.link,
  sort_order = excluded.sort_order,
  is_active = true;

-- ------------------------------- Career positions ---------------------------
insert into public.career_positions (slug, title, department, location, type, description, responsibilities, requirements)
values
  ('senior-data-engineer', 'Senior Data Engineer', 'Engineering', 'Kampala, Uganda (Hybrid)', 'full_time',
   'Design, build, and maintain the data infrastructure powering Metis Database and Metis Analytics.',
   array[
     'Architect and implement ETL/ELT pipelines across cloud data warehouses',
     'Own data modeling, quality, and performance for client platforms',
     'Partner with product and analytics to ship reliable, well-governed data systems',
     'Mentor junior engineers on best practices and code review'
   ],
   array[
     '5+ years of production data engineering (Python/SQL)',
     'Deep experience with Postgres and a cloud warehouse (BigQuery, Snowflake, or Redshift)',
     'Hands-on with dbt, Airflow, or equivalent orchestration',
     'Strong grasp of data governance, security, and observability'
   ]),
  ('full-stack-engineer', 'Full-Stack Engineer', 'Engineering', 'Kampala, Uganda (Hybrid)', 'full_time',
   'Build the customer-facing products and dashboards that turn data into decisions.',
   array[
     'Ship features across Next.js frontends and Node/Python backends',
     'Own end-to-end delivery: design, implementation, testing, and deployment',
     'Collaborate with data engineers to expose data safely via APIs',
     'Contribute to design system and reusable component library'
   ],
   array[
     '3+ years of professional full-stack development',
     'Strong TypeScript, React, and Next.js (App Router) experience',
     'Comfortable with Postgres, REST/GraphQL, and cloud deployment',
     'Product mindset: care about UX, accessibility, and performance'
   ]),
  ('analytics-consultant', 'Analytics Consultant', 'Consulting', 'Kampala, Uganda', 'full_time',
   'Partner with clients to translate business questions into analytics products and decisions.',
   array[
     'Lead discovery workshops with NGO, SME, and government clients',
     'Design dashboards, KPIs, and reporting frameworks',
     'Deliver insights via advanced analytics, forecasting, and scenario modeling',
     'Coach client teams on adopting a data-driven operating model'
   ],
   array[
     '4+ years in analytics consulting or a senior analyst role',
     'Fluent in SQL, Python or R, and a BI tool (Power BI / Looker / Metabase)',
     'Excellent written and verbal communication',
     'Bonus: exposure to the East African public or NGO sector'
   ]),
  ('product-designer', 'Product Designer', 'Design', 'Remote (EAT ±3h)', 'contract',
   'Own the design language for Metis products and marketing surface.',
   array[
     'Design end-to-end flows for data-heavy products',
     'Evolve and maintain the Metis design system in Figma',
     'Partner with engineering to ship pixel-perfect, accessible interfaces',
     'Run lightweight usability sessions with real users'
   ],
   array[
     '4+ years of product design experience',
     'Strong portfolio of shipped B2B or data products',
     'Comfort with systems thinking and design tokens',
     'Familiar with accessibility standards (WCAG 2.1 AA)'
   ])
on conflict (slug) do update set
  title = excluded.title,
  department = excluded.department,
  location = excluded.location,
  type = excluded.type,
  description = excluded.description,
  responsibilities = excluded.responsibilities,
  requirements = excluded.requirements,
  is_active = true;
