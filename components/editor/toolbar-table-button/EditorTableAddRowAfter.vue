<template>
  <CommonButton :id="getId" label="AddRowAfter"
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
export default class EditorTableAddRowAfter extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'add-row-after-button';
  }

  get isDisabled() {
    return !this.editor.can().addRowAfter();
  }

  private handleClick() {
    this.editor.chain().focus().addRowAfter().run();
  }
}
</script>
