<template>
  <CommonButton :id="getId" label="DeleteColumn"
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
export default class EditorTableDeleteColumn extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'table-delete-column-button';
  }

  get isDisabled() {
    return !this.editor.can().deleteColumn();
  }

  private handleClick() {
    this.editor.chain().focus().deleteColumn().run();
  }
}
</script>
