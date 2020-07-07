<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="login-page" v-if="!isLoggingIn" key="login">
        <transition name="fade" mode="out-in">
          <div class="form-box" v-if="!showSignup" key="login-box">
            <form @submit.prevent="login">
              <h1>Greenpaper</h1>
              <input type="text" v-model="username" placeholder="Username" autocomplete="username" required />
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                autocomplete="current-password"
                required
              />
              <p class="error" v-if="errors" v-text="errors"></p>
              <button type="submit">Login</button>
              <button type="button" @click="showSignup = true">Create an account</button>
            </form>
          </div>
          <div class="form-box" v-else key="signup-box">
            <form @submit.prevent="signup">
              <h1>Greenpaper</h1>
              <input type="text" v-model="signupData.name" placeholder="Name" autocomplete="name" required />
              <input
                type="email"
                v-model="signupData.email"
                placeholder="Email address"
                autocomplete="email"
                required
              />
              <input
                type="text"
                v-model="signupData.username"
                placeholder="Username"
                autocomplete="username"
                required
              />
              <input
                type="password"
                autocomplete="new-password"
                v-model="signupData.password"
                placeholder="New password"
                required
              />
              <input
                type="password"
                v-model="signupData.repeatPassword"
                placeholder="Repeat password"
                autocomplete="new-password"
                required
              />
              <p class="error" v-if="signupData.errors" v-text="signupData.errors"></p>
              <button type="submit">Create account</button>
              <button type="button" @click="showSignup = false">Back to login</button>
            </form>
          </div>
        </transition>
      </div>
      <div v-else class="loading-page" key="loading">
        <loading-spinner />
        <p>Logging in...</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "@vue/composition-api";
import { getClient } from "../api/feathers-client";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default defineComponent({
  name: "login",

  components: {
    LoadingSpinner,
  },

  setup(props, context) {
    const client = getClient();
    const isLoggingIn = ref(true);
    const isSigningUp = ref(false);
    const showSignup = ref(false);
    const loginData = reactive({
      username: "",
      password: "",
      errors: "",
    });
    const signupData = reactive({
      name: "",
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      errors: "",
    });

    const useLoginPromise = (loginPromise: Promise<unknown>, ignoreError?: boolean) =>
      loginPromise
        .then(() => new Promise(r => setTimeout(r, 500)))
        .then(() => {
          context.emit("login");
        })
        .catch(err => {
          console.log({ err, errProto: Object.getPrototypeOf(err) });
          if (!ignoreError) {
            loginData.errors = err.message;
          }
        })
        .finally(() => {
          isLoggingIn.value = false;
        });

    const login = () => {
      if (isLoggingIn.value) return;
      isLoggingIn.value = true;
      return useLoginPromise(
        client.authenticate({
          strategy: "local",
          username: loginData.username,
          password: loginData.password,
        }),
      );
    };

    const loginWith = (username: string, password: string) => {
      if (isLoggingIn.value) return;
      isLoggingIn.value = true;
      return useLoginPromise(
        client.authenticate({
          strategy: "local",
          username,
          password,
        }),
      );
    };

    const signup = async () => {
      console.log("signup");
      if (isLoggingIn.value || isSigningUp.value) return;
      isSigningUp.value = true;
      await client.logout().catch(() => client.authentication.removeAccessToken());
      const newUser: object | void = await client
        .service("users")
        .create({
          name: signupData.name,
          username: signupData.username,
          password: signupData.password,
          email: signupData.email,
          preferences: {},
        })
        .catch(err => {
          signupData.errors = err.message;
        });
      isSigningUp.value = false;
      if (!newUser) return;
      return loginWith(signupData.username, signupData.password);
    };

    useLoginPromise(client.reAuthenticate(), true);

    return { login, signup, isLoggingIn, isSigningUp, showSignup, ...toRefs(loginData), signupData };
  },
});
</script>

<style lang="scss" scoped>
$topPadding: 14vh;

.loading-page {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-page p {
  margin-top: 1rem;
}

.login-page {
  width: 100vw;
  min-height: calc(100vh - $topPadding);
  display: flex;
  padding-top: $topPadding;
  justify-content: center;
}

.login-page h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.login-page form {
  display: flex;
  flex-direction: column;
}

.login-page input {
  // outline: none;
  border: none;
  font: inherit;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  // color: white;
  margin-bottom: 0.5rem;
}

.login-page button {
  text-align: center;
  padding: 0.5rem;
  margin-bottom: 0.55rem;
  transition: all 0.2s;
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.form-box {
  padding: 2rem;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}

.error {
  margin-bottom: 1rem;
}
</style>
