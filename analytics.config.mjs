export const analyticsOptions = {
  providers: [
    { name: 'fathom', siteId: 'XIXPZGYU' },
    { name: 'plausible', scriptSrc: 'https://plausible.io/js/pa-fojvtOzO2SUUx_P2yjqEq.js' },
    {
      name: 'google-analytics', measurementId: 'G-GVB6HKL9PR', pageviews: 'provider',
      consent: { mode: 'immediate', initial: {
        analyticsStorage: 'granted', adStorage: 'denied', adUserData: 'denied', adPersonalization: 'denied',
      } },
    },
    { name: 'matomo', trackerUrl: 'https://matomo.codeworkslabs.net/matomo.php', scriptSrc: 'https://matomo.codeworkslabs.net/matomo.js', siteId: '1', eventCategory: 'CodeWorksLabs' },
    { name: 'umami', scriptSrc: 'https://umami.codeworkslabs.net/script.js', websiteId: '04f59d2a-643c-4d49-8af2-27701a6b1496' },
  ],
  events: true,
};
