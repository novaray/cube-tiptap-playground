<template>
  <CommonButton :id="getId" label="TextLeftAlign"
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
export default class EditorTextLeftAlign extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly TEXT_ALIGN_LEFT_NAME: string = 'left';

  get getId() {
    return 'text-left-align-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.TEXT_ALIGN_LEFT_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().setTextAlign(this.TEXT_ALIGN_LEFT_NAME).run();
  }
}
</script>
