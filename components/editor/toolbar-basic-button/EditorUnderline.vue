<template>
  <CommonButton :id="getId" label="Underline"
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
export default class EditorUnderline extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'underline-button';
  }

  private readonly UNDERLINE_NAME: string = 'underline';

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.UNDERLINE_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().toggleUnderline().run();
  }
}
</script>
