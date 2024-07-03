<template>
  <div>
    <main id="main-wrapper">
      <div class="product-container">
        <div class="product" v-for="(lesson, index) in lessons" :key="index">
          <figure>
            <img :src="lesson.image" alt="Lesson Image">
          </figure>
          <div class="lesson-details">
            <h2>{{ lesson.title }}</h2>
            <p>Location: {{ lesson.location }}</p>
            <p>Price: {{ lesson.price }}</p>
            <p>Slots Available: {{ lesson.space }}</p>

            <!-- Temporarily remove v-if and :disabled for debugging -->
            <button class="success-button" style="background-color: gold;" @click="addLessonToCart(lesson)"
>
              Add to Cart
            </button><br><br>

            <span v-if="lesson.space === 0">All out!</span>
            <span v-else-if="lesson.space < 5">Only {{ lesson.space - cartCount(lesson.id) }} left!</span>
            <span v-else>Buy Now!</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "LessonComponent",
  props: {
    lessons: { type: Array, required: true },
    "add-to-cart": {},
    canAddToCart: { type: Function, required: true },
    cartCount: { type: Function, required: true },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    addLessonToCart(lesson) {
      this.$emit("add-to-cart", lesson);
    },
  },
};
</script>

<style scoped>
/* Product container */
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px; /* Adjust maximum width for responsiveness */
  width: 100%; /* Ensure full width on smaller screens */
  margin: 0 auto; /* Center align and add margin */
}

/* Individual product card */
.product {
  width: calc(25% - 20px); /* Adjusted width for each card */
  margin: 10px; /* Margin between cards */
  padding: 15px; /* Increased padding */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-align: center; /* Center align text content */
}

/* Hover effect for product card */
.product:hover {
  transform: scale(1.03); /* Slightly reduce hover scale */
}

/* Product image styling */
.product img {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0; /* Rounded corners on top */
}

/* Product details */
.product-details {
  padding: 8px; /* Adjusted padding */
}

.product-details h2 {
  margin-top: 0;
  font-size: 1rem; /* Reduced font size */
}

.product-details p {
  margin-bottom: 4px; /* Reduced margin bottom */
}

/* Button styling */
.success-button {
  background-color: gold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: black;
  transition: background-color 0.3s;
}

.success-button:hover {
  background-color: darkgoldenrod;
}

.success-button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

@media  (max-width: 575.98px){
  .product{ 
    width: 100%;
  }
  
}
</style>
