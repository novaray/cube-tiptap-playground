<template>
  <el-dialog title="Paste Json Dialog"
             center
             :close-on-click-modal="false"
             :show-close="false"
             :visible.sync="isVisible"
             @close="onClosed"
             width="30%">
    <el-input type="textarea" v-model="jsonText" placeholder="Please Input json" :rows="7">
    </el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel" type="danger">Cancel</el-button>
      <el-button @click="onSubmit" type="primary" :disabled="submitIsDisabled">Submit</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import CommonButton from '~/components/button/CommonButton.vue';
import {Vue, Component} from 'nuxt-property-decorator';

@Component({
  components: {CommonButton},
})
export default class PasteJsonDialog extends Vue {
  private jsonText: string = '';
  private resolvePromise: any;
  private rejectPromise: any;
  private internalVisible: boolean = false;

  get getValue() {
    return this.jsonText;
  }

  get isVisible() {
    return this.internalVisible;
  }

  get submitIsDisabled() {
    return this.jsonText === '';
  }

  public show() {
    this.updateVisible(true);
    return new Promise((resolve, reject) => {
      this.resolvePromise = resolve;
      this.rejectPromise = reject;
    })
  }

  public updateVisible(value: boolean) {
      this.internalVisible = value;
  }

  public async onSubmit() {
    const done = () => {
      this.updateVisible(false);
      this.resolvePromise(this.jsonText);
    }

    done();
  }

  public async onCancel() {
    const done = () => {
      this.updateVisible(false);
      this.rejectPromise();
    }

    done();
  }

  public onClosed() {
    this.jsonText = '';
  }

}
</script>
