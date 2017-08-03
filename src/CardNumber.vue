<template>
  <div>
    <i class="fa" :class="brandFA" aria-hidden="true" />
    <stripe-element
      type='cardNumber'
      :stripe='stripe'
      :value='value'
      :options='options'
      @blur='$emit("blur")'
      @focus='$emit("focus")'
      @change='handleChange($event)'
    />
  </div>
</template>

<script>

import props from './props'
import StripeElement from './StripeElement'

export default {
  props,

  components: { StripeElement },

  data: function() {
    return {
      brand: "",
      complete: false,
      valid: true,
      invalidIcon: "fa-exclamation-triangle"
    };
  },

  computed: {
    brandFA: function() {
      if ( this.valid ) {
        return "fa-cc-" + this.brand;
      } else {
        return "fa-exclamation-triangle"
      }
    }
  },

  methods: {
    blur () { this.$refs.element.blur() },
    focus () { this.$refs.element.focus() },
    update (options) { this.$refs.element.update(options) },
    handleChange (ev) {
      this.complete = ev.complete;
      this.brand = ev.brand;
      this.valid = ev.error == undefined;
      this.$emit('change', ev);
    }
  }
}
</script>
