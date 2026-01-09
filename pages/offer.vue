<template>
  <HeroMain
    :custom-heading="t('offer.hero.heading')"
    :label="t('offer.hero.label')"
    :images="['/offer-slider-after-3.webp','/offer-slider-before-3.webp']"
  >
    {{ t('offer.hero.description') }}
  </HeroMain>
  <section>
    <div class="max-w-xl p-6 mx-auto pt-14 pb-24 lg:pt-24 lg:pb-32 px-4 lg:max-w-6xl">
        <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
          Gallery of example
          <span
            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
          >
          transformations
          </span>
        </h2>
        <p class="text-xl lg:text-2xl mt-6 font-light mb-6">
          Photos of a neglected interior are not appealing – clients see the problem, not the possibilities.
          <span class="bg-sunsetOrange-500 font-semibold text-white leading-6">Visualization is a gamechanger: it shows potential before they lose interest.
          </span> Instead of rejecting the offer because of first impressions, clients can look at it from a completely different perspective.
        </p>
        <SlidersGallery/>
      </div>
</section>
  <BenefitFeature
    heading="Benefit #1"
    highlightedText="Increasing "
    restOfHeading="the attractiveness of your offer"
    imageSrc="/offer-before-after-1.webp"
    imagePosition="right"
    :bottomParagraph="`When a potential buyer <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>browses dozens of similar listings</span>, attractive interior visualizations can catch their eye and spark interest. Even properties <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>requiring renovation</span>, which may seem unattractive at first glance, gain new life thanks to Instant Room. Visualizations allow you to present them as ready to move in, with beautifully arranged interiors that<span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'> inspire and encourage purchase.</span>`"
    :paragraphs="[
      `Thanks to visualizations created by Instant Room, your offers will <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>stand out in the real estate market.</span> They will attract more attention from potential clients. In today's world, competition in the real estate industry is huge, and an attractive presentation of the offer can determine the success of the sale.`,
      `As shown by <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>WKP Investments data,</span> in 2024 a new record was set for the number of apartments offered for sale. There are 36% more sale offers than at the beginning of 2024. These numbers indicate that <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>there are more and more available apartments, and fewer and fewer interested parties,</span> which only intensifies competition for clients.`
    ]"
  />

  <BenefitFeature
    heading="Benefit #2"
    highlightedText="Reducing"
    restOfHeading="sales time"
    imageSrc="/offer-before-after-2.webp"
    imagePosition="left"
    :paragraphs="[
      `Instant Room will help you attract client attention, which can lead to shorter sales times. Professional visualizations ensure that <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>clients don't have to wonder how the space might look after renovation or furnishing – they see it immediately.</span> This eliminates the barrier of imagination, which is often an obstacle in making a purchase decision.`,
      `As a result, <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>offers</span> become more convincing and <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>evoke emotions,</span> which play an important role in the purchasing process. Thanks to attractive visualizations, the decision to buy an apartment is easier and faster.`
    ]"
  />

  <BenefitFeature
    heading="Benefit #3"
    highlightedText="Supporting client "
    restOfHeading="decision-making"
    imageSrc="/offer-before-after-3.webp"
    imagePosition="right"
    :paragraphs="[
      `American real estate sales statistics show that <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>listings containing professional photos find new owners 50% faster. Moreover, 39% of them are sold closer to the asking price</span> than similar listings without professional photos. Additionally, listings with professional photos have <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'> 118% more views on listing portals</span> than listings with randomly taken photos. This data shows that professional visualizations are very effective marketing tools.`,
      `It should be noted that clients often need additional arguments to make a decision to purchase a property. <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'> Visualizations help them see how they can adapt the space to their lifestyle, which reduces doubts and makes decision-making easier.</span> This makes the sales process smoother and more efficient.`
    ]"
  />

  <BgCta
    :heading="'Thanks to the subscription. give your offers a second chance.'"
    :description="'From 24.90 PLN. Choose a package tailored to the number of apartments and scale of operation.'"
  />

  <WhyUs
    heading="Why choose"
    highlighted="Instant Room?"
    subtitle="Discover the key advantages of our tool"
    :items="items"
  />
  <MosaicSection
    title="Increase interest,"
    highlighted="sell faster"
    paragraph="Standard property photos often don't convey the full potential of the interior, especially if it requires renovation or is empty. Thanks to visualizations, you can <span class='bg-sunsetOrange-500 font-semibold text-white leading-6'> show clients more than the current state – you give them a vision of the future.</span><br/><br/> Offers enriched with <span class='bg-sunsetOrange-500 font-semibold text-white leading-6'> visualizations from Instant Room will attract attention on property portals</span> and in marketing materials, which will increase interest.<br/></br>
"
  />
  <ComparisonSection :is-home="true" :images="images"   title="Imagination is not enough."
  highlighted="Clients need to see to believe."
  paragraph="Instead of using only descriptions and photos that may not fully convey the possibilities of the interior, you can show the client exactly how the space can be arranged. <br/><br/> Visualizations will show different arrangement possibilities. This makes the conversation more concrete and the client's decision more informed." />
  <HowItWorks/>
  <PricingSection/>
  <FaqList/>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({
  title: t('offer.seo.title'),
  ogTitle: t('offer.seo.title'),
  description: t('offer.seo.description'),
  ogDescription: t('offer.seo.description'),
})
  import img1 from '@/public/offer-1-after.webp';
  import img2 from '@/public/offer-1-before.webp';
  const images = [img1, img2];
const items = [
  {
    icon: 'mdi:lightning-bolt',
    title: 'Fast and realistic visualizations',
    description: 'Thanks to Instant Room, you can create interior visualizations in just a few seconds! Imagine that <span class=\'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800\'>you have a property requiring renovation –</span> photos in such a state don't encourage viewing the listing. Our tool allows you to transform such an interior into a fully furnished and aesthetic room that looks real.<br/><br/> What previously required time, a designer's work, and significant financial outlay is now available instantly.',
    images: ['/offer-slider-after.webp','/offer-slider-before.webp'],
  },
  {
    icon: 'mdi:palette-outline',
    title: 'Various architectural styles',
    description: 'You have a choice of various styles – from modern, minimalist, refreshed to classic elegance. This allows you to match the offer to different client tastes, increasing sales chances. This tool changes the way you present properties.<span class=\'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800\'> It allows you to turn difficult-to-sell interiors into market gems, ready to show their potential.</span>',
    images: ['/offer-slider-after-2.webp','/offer-slider-before-2.webp'],
  },
  {
    icon: 'mdi:cash-clock',
    title: 'Saving time and costs',
    description: 'By using Instant Room, you eliminate many costly and time-consuming stages of traditional property preparation for sale. Creating interior visualizations in our app is fast and fully automated.<span class=\'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800\'> Therefore, you don't need to engage external interior designers, graphic designers, or photographers specializing in home staging.</span>',
    images: ['/offer-1-after.webp','offer-1-before.webp'],
  },
];
</script>
