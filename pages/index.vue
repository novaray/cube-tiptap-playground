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
}
</script>
