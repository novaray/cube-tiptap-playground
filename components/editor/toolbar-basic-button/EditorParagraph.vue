<template>
  <CommonButton :id="getId" label="paragraph"
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
export default class EditorParagraph extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly PARAGRAPH_NAME: string = 'paragraph';

  get getId() {
    return 'paragraph-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.PARAGRAPH_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().setParagraph().run();
  }
}
</script>
