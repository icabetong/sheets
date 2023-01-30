<script lang="ts">
  import { window, os } from '@tauri-apps/api'
  import { onMount } from 'svelte'
  import Main from './pages/Main.svelte'
  import { darkTheme } from './stores/theme'

  $: dark = $darkTheme
  onMount(async () => {
    let hostOS = await os.type()
    if (hostOS !== 'Linux') {
      $darkTheme = (await window.appWindow.theme()) === 'dark'
    } else $darkTheme = true
  })
</script>

<div class:dark>
  <Main />
</div>
