export const Stripe = {
  instance: null,
  createToken: null,
  elements: null
}

export const baseStyle = {
  base: {
    color: '#32325d',
    lineHeight: '24px',
    fontFamily: 'FFScalaSansWebProRegular,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    lineHeight: '1.4',
    '::placeholder': {
      color: '#777c7f'
    }
  },
  invalid: {
    color: '#ff3939',
    iconColor: '#ff3939'
  }
}

function init(key) {
  if (typeof key === "object" && typeof key.elements === "function") {
    Stripe.instance = key
  }

  if (window.Stripe === undefined && Stripe.instance === null) {
    console.error('Stripe V3 library not loaded!')
  } else if (Stripe.instance === null) {
    Stripe.instance = window.Stripe(key)
  }

  if (!Stripe.instance.elements) {
    console.error('Stripe V3 library not loaded!')
  } else if (Stripe.elements === null) {
    if (window.locale === undefined) {
      Stripe.elements = Stripe.instance.elements();
    } else {
      Stripe.elements = Stripe.instance.elements({locale: window.locale});
    }
  }
}

export function create(elementType, key_or_stripe, options = {}) {
  init(key_or_stripe)
  options.style = Object.assign(baseStyle, options.style || {})

  const element = Stripe.elements.create(elementType, options)

  if (Stripe.createToken === null) {
    Stripe.createToken = (options) => Stripe.instance.createToken(element, options)
  }

  return element
}
