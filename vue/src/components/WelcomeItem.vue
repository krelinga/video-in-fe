<template>
  <div class="item mt-8 flex relative lg:mt-0 lg:py-1.5 lg:pl-20">
    <i class="flex items-center justify-center w-8 h-8 text-[var(--color-text)] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-7 lg:border lg:border-[var(--color-border)] lg:bg-[var(--color-background)] lg:rounded-lg lg:w-12 lg:h-12">
      <slot name="icon"></slot>
    </i>
    <div class="details flex-1 ml-4 lg:ml-0">
      <h3 class="text-xl font-medium mb-1.5 text-[var(--color-heading)]">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* Complex pseudo-elements for the connecting lines - keeping in CSS for now */
@media (min-width: 1024px) {
  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
