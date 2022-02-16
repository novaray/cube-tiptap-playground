<template>
  <el-upload
    :id="getId"
    :accept="getAccept"
    class="upload-demo"
    action=""
    :on-change="onChange"
    :auto-upload="false"
    :limit="1"
    :show-file-list="false">
    <CommonButton id="file-upload-button" label="Image Upload" size="mini" type="default"></CommonButton>
  </el-upload>
</template>
<script lang="ts">
import {Vue, Prop, Component} from 'nuxt-property-decorator';
import IconButton from '@/components/button/IconButton.vue';
import CommonButton from '~/components/button/CommonButton.vue';

@Component({
  components: {CommonButton, IconButton},
})
export default class FileInput extends Vue {
  @Prop({default: ''}) protected readonly value: any;

  get getId() {
    return 'file-input';
  }

  get getAccept() {
    return 'image/*';
  }

  public onChange(file: any, fileList: any[]) {
    this.$emit('fileChange', file.raw);
    fileList.length = 0;
  }
}
</script>
