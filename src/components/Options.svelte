<script lang="ts">
  import { onMount } from "svelte";

  let count = 0;
  let message: string = null;

  onMount(() => {
    chrome.storage.sync.get("count", (data) => {
      count = data.count;
    });
  });

  const handleSave = () => {
    chrome.storage.sync.set({ count }).then(() => {
      message = "Updated!";

      setTimeout(() => {
        message = null;
      }, 2000);
    });
  };
</script>

<div class="flex flex-col py-[3%] px-[2%] bg-blue-50 h-screen">
  <h2 class="mb-5">Options Page</h2>
  {#if message}
    <span class="font-bold text-blue-800">{message}</span>
  {/if}

  <form on:submit|preventDefault={handleSave} class="flex flex-col gap-4">
    <div class="flex items-center gap-2 w-full">
      <label for="count" class="text-lg font-bold text-gray-700">
        New Count:
      </label>
      <input
        type="number"
        id="count"
        name="count"
        class="border border-gray-300 rounded-md p-2 flex-1"
        bind:value={count}
      />
    </div>
    <i>Add other configurations here!</i>

    <button
      class="w-full bg-blue-500 text-white text-base font-bold py-2 px-4 rounded"
      type="submit"
    >
      Save
    </button>
  </form>
</div>
