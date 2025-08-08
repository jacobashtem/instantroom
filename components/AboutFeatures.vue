<template>
<section class="w-full">
  <div class="max-w-xl p-6 mx-auto pt-14 pb-24 lg:pt-24 lg:pb-32 px-4 lg:max-w-6xl">
    <div>
      <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">Why
        <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">
            choose us?
        </span>
        </h2>
      <p class="text-xl lg:text-2xl mt-6 font-light">What makes Instantroom stand out and unique?</p>
    </div>
    <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <div class="mt-12 space-y-12">
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20  text-aquaBlue-500" name="game-icons:unicorn" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Every project is unique</h4>
              <p class="mt-4 text-lg font-light tracking-tight sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl"> ...and tailored to your needs. Visualizations are created on <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">the basis of your room,</span> taking into account its shape and often transforming the furniture visible in the photo.</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 text-aquaBlue-500" name="subway:mark" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Your generations will not have a watermark</h4>
              <p class="mt-4 text-lg font-light tracking-tight  sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl">and you can use them for both personal and commercial purposes.</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 text-aquaBlue-500" name="mdi:meditation" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">Save time and nerves!</h4>
              <p class="mt-4 text-lg font-light tracking-tight  sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl"> If you're tired of combing the internet for renovation inspiration, browsing hundreds of pages and photos, our AI Room Decorator is the solution for you! Don't waste time anymore and with just a few clicks, see how your living room looks in boho, modern, or glamour style.</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 bg-white text-aquaBlue-500  rounded-full" name="tabler:coin-filled" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">The first 3 visualizations are completely free!</h4>
              <p class="mt-4 ext-lg font-light tracking-tight sm:mt-2 sm:text-xl text-lg xl:text-2xl"><span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">No gimmicks, no payments.</span> If you like our tool, we encourage you to purchase tokens!</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" class="mt-10 lg:mt-0">
        <NuxtImg loading="lazy" width="600" height="600" src="/about-us-promo-img.webp" class="mx-auto lg:ml-8" style="color:transparent"/>
      </div>
    </div>
  </div>
</section>

</template>