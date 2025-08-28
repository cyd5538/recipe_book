/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '킥받은레시피 - 쉽고 빠른 요리 블로그',
  author: '킥받은레시피',
  headerTitle: '킥받은레시피',
  description:
    '안녕하세요! 요리 주인장이 하나씩 배워가며 성장하는 과정을 함께 기록하는 블로그입니다. ' +
    'AI 추천 레시피와 함께 실패담부터 성공 노하우까지 솔직하게 공유하며, 같은 초보자 분들께 도움이 되고 싶어요. ' +
    '요리가 어려웠던 분들도 쉽게 따라할 수 있는 집밥 요리, 간편식 레시피, 건강한 다이어트 요리를 단계별로 자세히 알려드립니다. ' +
    '한식, 양식, 중식, 일식 가리지 않고 도전해보며, 실패하면서 배운 꿀팁들과 재료 준비법도 아낌없이 나눠요. ' +
    '바쁜 일상 속에서도 만들 수 있는 10분 요리, 15분 간단 요리, 원팟 요리, 에어프라이어 요리부터 특별한 날 파티 요리까지! ' +
    '건강도 챙기고 싶은 마음으로 저염식, 저칼로리 요리, 당뇨·고혈압 환자분들을 위한 건강 요리도 함께 연구하고 있어요. 같이 요리해요!',
  language: 'ko',
  theme: 'system', // system, dark or light
  siteUrl: 'https://kick-recipe.vercel.app/',
  siteRepo: '',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/kick.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/kick.jpg`,
  email: 'cyd5538@google.com',
  // twitter: 'https://twitter.com/Twitter',
  youtube: 'https://www.youtube.com/@kickbaneun_recipe',
  instagram: 'https://www.instagram.com/kick.recipe/',
  tiktok: 'https://www.tiktok.com/@kick.recipe?lang=ko-KR',
  locale: 'ko',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
};

module.exports = siteMetadata;
