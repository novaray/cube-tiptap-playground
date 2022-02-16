<template>
  <TiptapEditor id="editor" v-model="content"></TiptapEditor>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import TiptapEditor from '@/components/editor/TiptapEditor.vue';

@Component({
  components: {TiptapEditor}
})
export default class index extends Vue {
  private content: string = '';

  public mounted() {
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => e.preventDefault());
  }
}
</script>
