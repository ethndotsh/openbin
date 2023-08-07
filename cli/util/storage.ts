import { LocalStorage } from "https://deno.land/x/fast_storage/mod.ts";

const storage = new LocalStorage("./openbin.sqlite", "openbin");

export default storage;
