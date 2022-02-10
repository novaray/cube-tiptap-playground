<template>
  <CommonButton :id="getId" label="TextCenterAlign"
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
export default class EditorTextCenterAlign extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly TEXT_ALIGN_CENTER_NAME: string = 'center';

  get getId() {
    return 'text-center-align-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.TEXT_ALIGN_CENTER_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().setTextAlign(this.TEXT_ALIGN_CENTER_NAME).run();
  }
}
</script>
