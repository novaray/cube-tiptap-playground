<template>
  <CommonButton :id="getId" label="DeleteRow"
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
export default class EditorTableDeleteRow extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'table-delete-row-button';
  }

  get isDisabled() {
    return !this.editor.can().deleteRow();
  }

  private handleClick() {
    this.editor.chain().focus().deleteRow().run();
  }
}
</script>
