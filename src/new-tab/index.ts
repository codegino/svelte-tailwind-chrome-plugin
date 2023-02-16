import '../app.css';
import Counter from '../components/Counter.svelte';

const target = document.getElementById('app');

async function render() {
  const {count} = await chrome.storage.sync.get({count: 0});

  new Counter({target, props: {count}});
}

document.addEventListener('DOMContentLoaded', render);
