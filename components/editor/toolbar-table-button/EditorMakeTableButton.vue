<template>
  <div>
    <el-input-number v-model="data.rows" :min="1" :max="10"></el-input-number>
    <el-input-number v-model="data.rows" :min="1" :max="10"></el-input-number>
    <el-checkbox v-model="data.isWithHeaderRow"></el-checkbox>
    <CommonButton :id="getId" label="MakeTable"
                  size="mini" type="default" class="icon-button" @click="handleClick"
                  :disabled="isDisabled"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton},
})
export default class EditorMakeTableButton extends Vue {
  @Prop({default: null}) private editor: Editor;

  private data = {
    rows: 3,
    columns: 3,
    isWithHeaderRow: true
  };

  /**
   * table안의 table 중복 생성을 방지하기 위함.
   * table인지 아닌지 여부를 알려주는 마땅한 함수가 없어 table 삭제가 가능한지 아닌지로 여부 판단함.
   */
  get isDisabled() {
    return this.editor.can().deleteTable();
  }

  get getId() {
    return 'make-table-button';
  }

  private handleClick() {
    this.editor.chain().focus().insertTable({
      rows: this.data.rows,
      cols: this.data.columns,
      withHeaderRow: this.data.isWithHeaderRow
    }).run();
  }
}
</script>
