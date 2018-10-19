import Vue from 'vue';

interface VueStripeCheckout {
    open: (opt) => void;
}

declare module 'vue/types/vue' {
    interface Vue {
        $checkout: VueStripeCheckout;
    }
}
