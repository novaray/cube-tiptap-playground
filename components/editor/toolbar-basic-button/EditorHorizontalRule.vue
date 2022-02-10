<template>
  <CommonButton :id="getId" label="HorizontalRule"
                size="mini" type="default" class="icon-button" @click="handleClick"/>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton},
})
export default class EditorHorizontalRule extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'horizontal-rule-button';
  }

  private handleClick() {
    this.editor.chain().focus().setHorizontalRule().run();
  }
}
</script>
