<template>
  <div id="basic-toolbar">
    <EditorHeading :editor="editor" id="heading"></EditorHeading>
    <EditorParagraph :editor="editor" id="paragraph"></EditorParagraph>
    <EditorBold :editor="editor" id="bold"></EditorBold>
    <EditorItalic :editor="editor" id="italic"></EditorItalic>
    <EditorHighlight :editor="editor" id="highlight"></EditorHighlight>
    <EditorHyperLink :editor="editor" id="hyperLink"></EditorHyperLink>
    <EditorTextLeftAlign :editor="editor" id="textAlignLeft"></EditorTextLeftAlign>
    <EditorTextCenterAlign :editor="editor" id="textAlignCenter"></EditorTextCenterAlign>
    <EditorTextRightAlign :editor="editor" id="textAlignRight"></EditorTextRightAlign>
    <EditorHorizontalRule :editor="editor" id="horizontalRule"></EditorHorizontalRule>
    <EditorBulletList :editor="editor" id="bulletList"></EditorBulletList>
    <EditorOrderedList :editor="editor" id="orderedList"></EditorOrderedList>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import EditorHeading from '@/components/editor/toolbar-basic-button/EditorHeading.vue';
import EditorParagraph from '@/components/editor/toolbar-basic-button/EditorParagraph.vue';
import EditorBold from '@/components/editor/toolbar-basic-button/EditorBold.vue';
import EditorItalic from '@/components/editor/toolbar-basic-button/EditorItalic.vue';
import EditorHighlight from '@/components/editor/toolbar-basic-button/EditorHighlight.vue';
import EditorHorizontalRule from '@/components/editor/toolbar-basic-button/EditorHorizontalRule.vue';
import EditorBulletList from '@/components/editor/toolbar-basic-button/EditorBulletList.vue';
import EditorOrderedList from '@/components/editor/toolbar-basic-button/EditorOrderedList.vue';
import EditorHyperLink from '@/components/editor/toolbar-basic-button/EditorHyperLink.vue';
import EditorTextLeftAlign from '@/components/editor/toolbar-basic-button/EditorTextLeftAlign.vue';
import EditorTextRightAlign from '@/components/editor/toolbar-basic-button/EditorTextRightAlign.vue';
import EditorTextCenterAlign from '@/components/editor/toolbar-basic-button/EditorTextCenterAlign.vue';
import {Vue} from 'nuxt-property-decorator';

@Component({
  components: {
    EditorTextCenterAlign, EditorTextRightAlign, EditorTextLeftAlign, EditorHyperLink,
    EditorOrderedList, EditorBulletList, EditorHorizontalRule,
    EditorHighlight, EditorItalic, EditorBold,
    EditorParagraph, EditorHeading
  },
})
export default class BasicToolbar extends Vue {
  @Prop({default: null}) private editor: Editor;
}
</script>
