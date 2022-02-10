<template>
  <CommonButton :id="getId" label="italic"
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
export default class EditorStrike extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly ITALIC_NAME: string = 'italic';

  get getId() {
    return 'italic-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.ITALIC_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().toggleItalic().run();
  }
}
</script>
