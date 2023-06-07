import { defineStore } from "pinia";

export const storage = defineStore({
  id: "userSession",
  state: () => ({
    session: null,
  }),
});
