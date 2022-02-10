<template>
  <div id="table-toolbar">
    <EditorMakeTableButton :editor="editor" id="makeTable"></EditorMakeTableButton>
    <EditorTableToggleHeaderRow :editor="editor" id="toggleHeader"></EditorTableToggleHeaderRow>
    <EditorTableAddColumnBefore :editor="editor" id="addColumnBefore"></EditorTableAddColumnBefore>
    <EditorTableAddColumnAfter :editor="editor" id="addColumnAfter"></EditorTableAddColumnAfter>
    <EditorTableDeleteColumn :editor="editor" id="deleteColumn"></EditorTableDeleteColumn>
    <EditorTableAddRowBefore :editor="editor" id="addRowBefore"></EditorTableAddRowBefore>
    <EditorTableAddRowAfter :editor="editor" id="addRowAfter"></EditorTableAddRowAfter>
    <EditorTableDeleteRow :editor="editor" id="deleteRow"></EditorTableDeleteRow>
    <EditorTableMergeCell :editor="editor" id="mergeCell"></EditorTableMergeCell>
    <EditorTableSplitCell :editor="editor" id="SplitCell"></EditorTableSplitCell>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import EditorMakeTableButton from '@/components/editor/toolbar-table-button/EditorMakeTableButton.vue';
import EditorTableToggleHeaderRow from '@/components/editor/toolbar-table-button/EditorTableToggleHeaderRow.vue';
import EditorTableAddColumnBefore from '@/components/editor/toolbar-table-button/EditorTableAddColumnBefore.vue';
import EditorTableAddColumnAfter from '@/components/editor/toolbar-table-button/EditorTableAddColumnAfter.vue';
import EditorTableDeleteColumn from '@/components/editor/toolbar-table-button/EditorTableDeleteColumn.vue';
import EditorTableAddRowBefore from '@/components/editor/toolbar-table-button/EditorTableAddRowBefore.vue';
import EditorTableAddRowAfter from '@/components/editor/toolbar-table-button/EditorTableAddRowAfter.vue';
import EditorTableDeleteRow from '@/components/editor/toolbar-table-button/EditorTableDeleteRow.vue';
import EditorTableMergeCell from '@/components/editor/toolbar-table-button/EditorTableMergeCell.vue';
import EditorTableSplitCell from '@/components/editor/toolbar-table-button/EditorTableSplitCell.vue';
import {Vue} from 'nuxt-property-decorator';

@Component({
             components: {
               EditorTableSplitCell, EditorTableMergeCell, EditorTableDeleteRow, EditorTableAddRowAfter,
               EditorTableAddRowBefore, EditorTableDeleteColumn, EditorTableAddColumnAfter, EditorTableAddColumnBefore,
               EditorTableToggleHeaderRow, EditorMakeTableButton
             },
           })
export default class TableToolbar extends Vue{
  @Prop({default: null}) private editor: Editor | undefined;
}
</script>
