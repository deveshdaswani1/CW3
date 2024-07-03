<template>
  <div class="checkout-form">
    <!-- Checkout Form -->
    <div class="checkout">
      <h2>Checkout</h2>
      <p>
        <strong>First Name:</strong>
        <input v-model.trim="order.firstName" />
      </p>
      <p>
        <strong>Last Name:</strong>
        <input v-model.trim="order.lastName" />
      </p>
      <p>
        <strong>Phone:</strong>
        <input v-model.number="order.phone" type="tel" />
      </p>

      <!-- Error message for empty fields -->
      <p v-if="!isFormValid" style="color: red;">Please fill in all fields.</p>

      <h2>Order Information</h2>
      <p>First Name: {{ order.firstName }}</p>
      <p>Last Name: {{ order.lastName }}</p>
      <p>Phone Number: {{ order.phone }}</p>
      <button @click="submitOrder" :disabled="!isFormValid">Place Order</button>
   
      <p v-if="orderSubmitted">Order Submitted!</p>
    </div>

    <!-- Shopping Cart List -->
    <div class="cart">
      <h2>Shopping Cart</h2>
      <ul class="cart-list">
        <li v-for="(cartItem, index) in cart" :key="index">
          <div class="cart-item">
            <figure>
              <img :src="cartItem.image" alt="Product Image">
            </figure>
            <div class="product-details">
              <h3>{{ cartItem.title }}</h3>
              <p><strong>Location:</strong> {{ cartItem.Location }}</p>
              <p><strong>Price:</strong> {{ cartItem.price }}</p>
              <p><strong>Slots Available:</strong> {{ cartItem.space }}</p>
            </div>
            <button @click="removeFromCart(cartItem.id)" class="remove-button">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutForm",
  props: ["cart","save-order","orderSubmitted", "cartCount"],
  data() {
    return {
      order: {
        firstName: '',
        lastName: '',
        phone: ''
      },
      isFormValid: false
    }
  },
  watch: {
    order: {
      handler() {
        this.validateForm();
      },
      deep: true
    }
  },
  methods: {
    validateForm() {
      this.isFormValid = !!this.order.firstName && !!this.order.lastName && !!this.order.phone;
    },
    submitOrder() {
      if (this.isFormValid) {
        this.order.cartProduct = this.cart;
        this.$emit("save-order",this.order);
      }
    },
    removeFromCart(lessonId) {
      this.$emit('remove-item-from-cart', lessonId);
    }
    // Other methods (submitOrder, removeFromCart, etc.) as needed
  }

  
  }


</script>

<style scoped>
/* Checkout form and cart layout */
.checkout-form {
  display: flex;
  justify-content: space-between;
  width: 800px;
}

.checkout {
  flex: 0 0 45%; /* Adjust width of checkout form */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.cart {
  flex: 1; /* Take remaining space for cart */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    
}

.cart-list {
  list-style-type: none;
  padding: 0;
  max-width: flex;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-item img {
  width: 80px;
  height: auto;
  border-radius: 8px;
  margin-right: 10px;
}

.product-details {
  flex: 1;
}

.remove-button {
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #d32f2f;
}

</style>
