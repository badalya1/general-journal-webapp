<template>
  <nav class="nav">
    <div class="header">
      <h3>Greenpaper</h3>
      <button @click="logout">Log out</button>
    </div>
    <div class="nav-items">
      <ul>
        <router-link
          v-for="route in routes"
          :key="route.name"
          tag="li"
          :to="{ name: route.name }"
          v-text="route.title"
        ></router-link>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { getClient } from "../api/feathers-client";

export default defineComponent({
  name: "nav-bar",

  setup(props, context) {
    const routes = [
      { name: "dashboard", title: "Dashboard" },
      { name: "transactions", title: "Transactions" },
      { name: "calendar", title: "Calendar" },
      { name: "scheduler", title: "Scheduler" },
      { name: "events", title: "Events" },
      { name: "budgets", title: "Budgets" },
      { name: "reports", title: "Reports" },
    ];
    const logout = async () => {
      await getClient().logout();
      context.emit("logout");
    };
    return { routes, logout };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1rem;
  display: flex;
  flex-direction: row;
}

.header h1 {
  display: inline;
}

.header button {
  margin-left: auto;
  padding: 0.4rem 1rem;
}

.nav-items {
  display: flex;
  justify-content: center;

  ul {
    list-style: none;
    display: flex;
    padding: 0.5rem 2rem;
  }

  li {
    border-radius: 4px;
    transition: all 0.2s;
    padding: 0.2rem 0.8rem;
    cursor: pointer;

    &.router-link-exact-active {
      font-weight: bold;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}
</style>
