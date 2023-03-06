<script lang="ts">
  import { onMount } from "svelte";
  export let count: number;
  let message: string = null;

  onMount(() => {
    chrome.runtime.onMessage.addListener(handleMessageEvent);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageEvent);
    };
  });

  function handleMessageEvent(request, _, sendResponse) {
    if (request.type === "count_updated") {
      sendResponse({ message: `from ${count} to ${request.count}` });
      count = request.count;
    }
  }

  const increment = () => (count += 1);
  const decrement = () => (count -= 1);

  const handleSave = async () => {
    await chrome.storage.sync.set({ count });
    message = "Updated!";

    try {
      const res = await chrome.runtime.sendMessage({
        count,
        type: "count_updated",
      });
      message += ` ${res.message}`;
    } catch (error) {
      // Handle error here
      console.log("TODO:", error);
    }

    setTimeout(() => {
      message = null;
    }, 2000);
  };
</script>

<div class=" bg-blue-50 min-w-[20rem] p-4 flex flex-col gap-4">
  <p class="text-blue-800 text-xl">
    Current count: <span class="font-extrabold">{count}</span>
  </p>
  <div class="flex items-center gap-2">
    <button on:click={decrement}>-</button>
    <button on:click={increment}>+</button>
    {#if message}<span class="text-base font-bold text-blue-800">{message}</span
      >{/if}
    <button class="ml-auto" on:click={handleSave}>Save</button>
  </div>
</div>

<style scoped>
  button {
    color: theme('colors.blue.700');
    padding: theme('spacing.2') theme('spacing.4');
    font-size: theme('fontSize.base');
    border: 1px solid theme('borderColor.blue.400');
    box-shadow: theme('boxShadow.lg');
    background-color: theme('backgroundColor.blue.50');
  }

  button:hover,
  button:focus {
    background-color: theme('colors.blue.800');
    color: theme('colors.blue.50');
  }
</style>
