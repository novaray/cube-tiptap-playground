<template>
  <CommonButton :id="getId" label="Video"
                size="mini" type="default" class="icon-button" @click="handleClick"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton},
})
export default class EditorEmbed extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'embed-button';
  }

  private handleClick() {
    const url = window.prompt('URL');

    if (url && (url.includes('youtube') || url.includes('youtu.be'))) {
      const embedUrl = `https://www.youtube.com/embed/${url.split('/').pop()}`;
      this.editor.chain().focus().setVideo({ src: embedUrl }).run();
    }
  }
}
</script>
