<template>
  <el-dropdown split-button @command="handleCommand" :id="getId" @click="handleClick">
      {{getSelectedDropdownText}}
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item  :command="1" :class="getActiveClass">
        Heading 1
      </el-dropdown-item>
      <el-dropdown-item  :command="2" :class="getActiveClass">
        Heading 2
      </el-dropdown-item>
      <el-dropdown-item  :command="3" :class="getActiveClass">
        Heading 3
      </el-dropdown-item>
      <el-dropdown-item  :command="4" :class="getActiveClass">
        Heading 4
      </el-dropdown-item>
      <el-dropdown-item  :command="5" :class="getActiveClass">
        Heading 5
      </el-dropdown-item>
      <el-dropdown-item  :command="6" :class="getActiveClass">
        Heading 6
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Level} from '@tiptap/extension-heading';
import {Vue} from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class EditorHeading extends Vue {
  @Prop({default: null}) private editor: Editor;

  private readonly HEADING_NAME: string = 'heading';

  get getId() {
    return 'heading-button';
  }

  get getSelectedDropdownText() {
    const level = this.getLevel;
    return level ? `Heading ${level}` : 'Heading 1';
  }

  get getLevel(): Level | null {
    for (let i = 1; i <= 6; i++) {
      if (this.editor.isActive(this.HEADING_NAME, { level: i })) {
        return i as Level;
      }
    }

    return null;
  }

  get getActiveClass() {
    return { 'is-active': this.editor.isActive(this.HEADING_NAME, { level: this.getLevel }) };
  }

  public handleCommand(level: Level) {
    this.editor.chain().focus().toggleHeading({level}).run();
  }

  private handleClick() {
    const level = this.getLevel ?? 1;
    if (!this.editor.isActive(this.HEADING_NAME, { level })) {
      this.editor.chain().focus().toggleHeading({level}).run();
    }
  }
}
</script>
