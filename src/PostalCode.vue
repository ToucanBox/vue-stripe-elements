<template>
  <stripe-element
    ref="element"
    type='postalCode'
    :stripe='stripe'
    :value='value'
    :options='options'
    @blur='$emit("blur")'
    @focus='$emit("focus")'
    @change='$emit("change", $event)'
  />
</template>

<script>
import props from './props'
import StripeElement from './StripeElement'

export default {
  props,

  props: ['postalCode', 'options', 'stripe'],

  components: { StripeElement },

  watch: {
    postalCode: function(newPostalCode) {
      this.update(
        {
          'value': newPostalCode
        }
      );
    }
  },

  methods: {
    blur () { this.$refs.element.blur() },
    focus () { this.$refs.element.focus() },
    update (options) {
      this.$refs.element.update(options);
    }
  }
}
</script>
