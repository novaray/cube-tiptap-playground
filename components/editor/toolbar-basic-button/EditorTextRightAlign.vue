<template>
  <CommonButton :id="getId" label="TextRightAlign"
                size="mini" type="default" class="icon-button" :class="getActiveClass" @click="handleClick"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import IconButton from '@/components/button/IconButton.vue';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton, IconButton},
})
export default class EditorTextRightAlign extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly TEXT_ALIGN_RIGHT_NAME: string = 'right';

  get getId() {
    return 'text-right-align-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.TEXT_ALIGN_RIGHT_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().setTextAlign(this.TEXT_ALIGN_RIGHT_NAME).run();
  }
}
</script>
