<template>
  <HeroMain
    :custom-heading="'Oferta dla agencji i pośredników'"
    :label="'Oferta'"
    :images="images"
  >
    Instant Room to innowacyjne narzędzie oparte na sztucznej inteligencji, które umożliwia
    tworzenie wizualizacji wnętrz
    na podstawie przesłanych zdjęć w zaledwie kilka sekund. Dzięki tej aplikacji,
    agencje i pośrednicy nieruchomości mogą w prosty sposób zaprezentować
    <span class="bg-sunsetOrange-500 font-semibold text-white leading-6">potencjał oferowanych mieszkań -
    nawet tych wymagających remontu.</span>
  </HeroMain>
  <section>
    <div class="max-w-xl p-6 mx-auto pt-14 pb-24 lg:pt-24 lg:pb-32 px-4 lg:max-w-6xl">
        <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
          Galeria przykładowych
          <span
            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
          >
          metamorfoz
          </span>
        </h2>
        <p class="text-xl lg:text-2xl mt-6 font-light mb-6">
          Zdjęcia zaniedbanego wnętrza nie zachęcają – klient widzi problem, nie możliwości.
          <span class="bg-sunsetOrange-500 font-semibold text-white leading-6">Wizualizacja to gamechanger: pokazuje potencjał, zanim zdąży się zniechęcić.
          </span> Zamiast odrzucić ofertę z powodu pierwszego wrażenia, klient może spojrzeć na nią z zupełnie innej perspektywy.
        </p>
        <SlidersGallery/>
      </div>
</section>
  <BenefitFeature
    heading="Korzyść #1"
    highlightedText="Zwiększenie "
    restOfHeading="atrakcyjności oferty"
    imageSrc="/offer-before-after-1.webp"
    imagePosition="right"
    :bottomParagraph="`Kiedy potencjalny nabywca <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>przegląda dziesiątki podobnych ogłoszeń</span>, a efektowne wizualizacje wnętrz są w stanie przyciągnąć jego wzrok i wzbudzić zainteresowanie. Nawet nieruchomości <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>wymagające remontu</span>, które na pierwszy rzut oka mogą wydawać się mało atrakcyjne, dzięki Instant Room zyskują nowe życie. Wizualizacje pozwolą zaprezentować je jako gotowe do zamieszkania, z pięknie zaaranżowanymi wnętrzami, które<span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'> inspirują i zachęcają do zakupu.</span>`"
    :paragraphs="[
      `Dzięki wizualizacjom tworzonym przez Instant Room, Twoje oferty <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>wyróżnią się&nbsp;na&nbsp;rynku&nbsp;nieruchomości.</span> Przyciągną większą uwagę potencjalnych klientów. W&nbsp;dzisiejszych czasach konkurencja w&nbsp;branży nieruchomości jest ogromna, a&nbsp;atrakcyjna prezentacja oferty może zadecydować o&nbsp;sukcesie sprzedaży.`,
      `Jak pokazują <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>dane WKP&nbsp;Investments,</span> w&nbsp;roku 2024 padł nowy rekord liczby mieszkań wystawionych na&nbsp;sprzedaż. Ofert sprzedaży jest o&nbsp;36% więcej niż na&nbsp;początku 2024&nbsp;roku. Te liczby wskazują na&nbsp;to, że <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>dostępnych mieszkań jest coraz więcej, a&nbsp;zainteresowanych coraz mniej,</span> co jedynie zaostrza konkurencję o&nbsp;klienta.`
    ]"
  />

  <BenefitFeature
    heading="Korzyść #2"
    highlightedText="Skrócenie"
    restOfHeading="czasu sprzedaży"
    imageSrc="/offer-before-after-2.webp"
    imagePosition="left"
    :paragraphs="[
      `Instant Room pomoże Ci w przyciągnięciu uwagi klienta, co może wpłynąć na krótszy czas sprzedaży. Profesjonalne wizualizacje sprawią, że <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>klient nie musi zastanawiać się, jak przestrzeń może wyglądać po remoncie czy umeblowaniu – widzi to od razu.</span> To eliminuje barierę wyobraźni, która często stanowi przeszkodę w podjęciu decyzji zakupowej.`,
      `W efekcie <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>oferty</span> stają się bardziej przekonujące i <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>wzbudzają emocje,</span> które odgrywają ważną rolę w procesie zakupu. Dzięki atrakcyjnym wizualizacjom, decyzja o zakupie mieszkania jest łatwiejsza i szybsza.`
    ]"
  />

  <BenefitFeature
    heading="Korzyść #3"
    highlightedText="Wsparcie w podejmowaniu "
    restOfHeading="decyzji klienta"
    imageSrc="/offer-before-after-3.webp"
    imagePosition="right"
    :paragraphs="[
      `Amerykańskie statystyki sprzedaży nieruchomości pokazują, że <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'>oferty sprzedaży zawierające profesjonalnie zdjęcia 50% szybciej znajdują nowych właścicieli. Ponadto 39% z nich jest sprzedawana bliżej ceny wyjściowej</span> niż w podobnych ofertach bez profesjonalnych zdjęć. Dodatkowo oferty z profesjonalnymi zdjęciami mają <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'> o 118% więcej odwiedzin na portalach ogłoszeniowych</span> niż oferty z przypadkowo zrobionymi zdjęciami. Te dane wskazują, że profesjonalne wizualizacje są bardzo skuteczne marketingowo.`,
      `Trzeba zaznaczyć, że klienci często potrzebują dodatkowych argumentów, aby podjąć decyzję o zakupie nieruchomości. <span class='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800'> Wizualizacje pomagają im zobaczyć, jak mogą dostosować przestrzeń do swojego stylu życia, co zmniejsza wątpliwości i ułatwia podjęcie decyzji.</span> Dzięki temu proces sprzedaży staje się płynniejszy i bardziej efektywny.`
    ]"
  />

  <BgCta
    :heading="'Dzięki abonamentowi, dasz swoim ofertom drugą szansę.'"
    :description="'Od 59,90 zł. Wybierz zestaw dopasowany do liczby mieszkań i skali działania'"
  />

  <WhyUs
    heading="Dlaczego warto wybrać"
    highlighted="Instant Room?"
    subtitle="Poznaj najważniejsze zalety naszego narzędzia"
    :items="items"
  />
  <MosaicSection   
    title="Zwiększ zainteresowanie,"
    highlighted="sprzedawaj szybciej"
    paragraph="Standardowe zdjęcia nieruchomości często nie oddają pełnego potencjału wnętrza, zwłaszcza jeśli wymaga ono remontu lub jest puste. Dzięki wizualizacjom możesz <span class='bg-sunsetOrange-500 font-semibold text-white leading-6'> pokazać klientom coś więcej niż obecny stan – dajesz im wizję przyszłości.</span><br/><br/> Oferty wzbogacone o <span class='bg-sunsetOrange-500 font-semibold text-white leading-6'> wizualizacje od Instant Room przyciągną uwagę na portalach nieruchomości</span> i w materiałach marketingowych, co zwiększy zainteresowanie <br/></br>
"
  />
  <ComparisonSection :is-home="true" :images="images"   title="Wyobraźnia to za mało."
  highlighted="Klient musi zobaczyć, żeby uwierzyć."
  paragraph="Zamiast używać jedynie opisów i zdjęć, które mogą nie oddawać pełni możliwości wnętrza, możesz pokazać klientowi dokładnie, jak przestrzeń może zostać zaaranżowana. <br/><br/> Wizualizacje pokażą różne możliwości aranżacyjne. To sprawia, że rozmowa staje się bardziej konkretna, a decyzja klienta – bardziej świadoma. " />
  <HowItWorks/>
  <PricingSection/>
  <FaqList/>
</template>

<script setup>
  import img1 from '@/public/offer-1-after.webp';
  import img2 from '@/public/offer-1-before.webp';
  const images = [img1, img2];
const items = [
  {
    icon: 'mdi:lightning-bolt',
    title: 'Szybkie i realistyczne wizualizacje',
    description: 'Dzięki Instant Room możesz tworzyć wizualizacje wnętrz w zaledwie kilka sekund! Wyobraź sobie, że <span class=\'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800\'>masz nieruchomość w stanie wymagającym remontu –</span> zdjęcia w takim stanie nie zachęcają do wejścia w ogłoszenie. Nasze narzędzie pozwoli Ci przeobrazić takie wnętrze w pełni urządzone i estetyczne pomieszczenie, które wygląda jak prawdziwe.<br/><br/> To, co wcześniej wymagało czasu, pracy projektanta i znacznych nakładów finansowych, teraz jest dostępne natychmiast.',
    images: ['/offer-slider-before.webp', '/offer-slider-after.webp'],
  },
  {
    icon: 'mdi:palette-outline',
    title: 'Różne style architektoniczne',
    description: 'Masz do wyboru różnorodne style – od nowoczesnego, minimalistycznego, odświeżonego po klasyczną elegancję.  Dzięki temu dopasujesz ofertę do różnorodnych gustów klientów, zwiększając szanse na sprzedaż. To narzędzie zmienia sposób, w jaki prezentujesz nieruchomość.<span class=\'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800\'> Pozwala z trudnych do sprzedaży wnętrz uczynić perełki rynkowe, gotowe do pokazania swojego potencjału.</span>',
    images: ['/offer-slider-before-2.webp', '/offer-slider-after-2.webp'],
  },
  {
    icon: 'mdi:cash-clock',
    title: 'Oszczędność czasu i kosztów',
    description: 'Korzystając z Instant Room, eliminujesz wiele kosztownych i czasochłonnych etapów tradycyjnego przygotowywania nieruchomości do sprzedaży. Tworzenie wizualizacji wnętrz w naszej aplikacji jest szybkie i w pełni zautomatyzowane.<span class=\'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800\'> A zatem nie musisz angażować zewnętrznych projektantów wnętrz, grafików czy fotografów specjalizujących się w home stagingu.</span>',
    images: ['/offer-slider-before-3.webp', '/offer-slider-after-3.webp'],
  },
];
</script>
