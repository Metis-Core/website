const SITE_URL = 'https://metisanalytica.com';

const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Metis Analytica',
  alternateName: 'Metis',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/PNG/LOGO%20DARK%20GREY.png`,
  description:
    'Metis Analytica designs, builds, and runs sovereign data infrastructure, custom analytics, and long-term data custodianship for organizations in emerging markets.',
  areaServed: ['Uganda', 'East Africa', 'Africa'],
  slogan: 'Reliable Data. Smarter Operations.',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
  },
  sameAs: [] as string[],
} as const;

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Metis Analytica',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/services?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
} as const;

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted JSON — safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }}
      />
    </>
  );
}
