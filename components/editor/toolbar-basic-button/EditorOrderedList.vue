<template>
  <CommonButton :id="getId" label="OrderedList"
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
export default class EditorOrderedList extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly ORDERED_LIST_NAME: string = 'orderedList';

  get getId() {
    return 'ordered-list-button';
  }

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.ORDERED_LIST_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().toggleOrderedList().run();
  }
}
</script>
