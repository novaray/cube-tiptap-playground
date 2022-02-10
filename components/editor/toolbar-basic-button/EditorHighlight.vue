<template>
  <CommonButton :id="getId" label="Highlight"
                size="mini" type="default" class="icon-button" :class="getActiveClass" @click="handleClick"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton},
})
export default class EditorHighlight extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'highlight-button';
  }

  private readonly HIGHLIGHT_NAME: string = 'highlight';

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.HIGHLIGHT_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().toggleHighlight().run();
  }
}
</script>
