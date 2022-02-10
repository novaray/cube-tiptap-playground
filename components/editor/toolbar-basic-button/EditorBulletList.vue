<template>
  <CommonButton :id="getId" label="UnorderedList"
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
export default class EditorBulletList extends Vue {
  @Prop({default: null}) private editor: Editor;

  get getId() {
    return 'bullet-list-button';
  }

  private readonly BULLET_LIST_NAME: string = 'bulletList';

  get getActiveClass() {
    return {'is-active': this.editor.isActive(this.BULLET_LIST_NAME)};
  }

  private handleClick() {
    this.editor.chain().focus().toggleBulletList().run();
  }
}
</script>
