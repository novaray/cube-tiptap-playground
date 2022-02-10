<template>
  <CommonButton :id="getId" label="HyperLink"
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
export default class EditorHyperLink extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly LINK_NAME: string = 'link';

  get getId() {
    return 'link-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.LINK_NAME)};
  }

  private handleClick() {
    if (this.editor.isActive(this.LINK_NAME)) {
      this.editor.chain().focus().extendMarkRange(this.LINK_NAME).unsetLink().run();
      return;
    }

    const previousUrl = this.editor.getAttributes(this.LINK_NAME).href;
    const url = window.prompt('URL', previousUrl) ?? '';
    if (url === '') {
      return;
    }

    this.editor.chain().focus().extendMarkRange(this.LINK_NAME).setLink({href: url}).run();
  }
}
</script>
