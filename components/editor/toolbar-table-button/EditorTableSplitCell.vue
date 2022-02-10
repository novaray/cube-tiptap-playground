<template>
  <CommonButton :id="getId" label="SplitCell"
              size="mini" type="default" class="icon-button" @click="handleClick"
              :disabled="isDisabled"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton},
})
export default class EditorTableSplitCell extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'table-split-cell-button';
  }

  get isDisabled() {
    return !this.editor.can().splitCell();
  }

  private handleClick() {
    this.editor.chain().focus().splitCell().run();
  }
}
</script>
