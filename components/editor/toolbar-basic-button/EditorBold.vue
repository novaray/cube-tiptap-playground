<template>
  <CommonButton :id="getId" label="Bold"
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
export default class EditorBold extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'bold-button';
  }

  private readonly BOLD_NAME: string = 'bold';

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.BOLD_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().toggleBold().run();
  }
}
</script>
