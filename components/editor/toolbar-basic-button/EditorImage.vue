<template>
  <FileInput @fileChange="onFileChange">

  </FileInput>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor} from '@tiptap/vue-2';
import {Vue} from 'nuxt-property-decorator';
import CommonButton from '~/components/button/CommonButton.vue';
import FileInput from '~/components/button/FileInput.vue';

@Component({
  components: {FileInput, CommonButton},
})
export default class EditorImage extends Vue {
  @Prop({default: null}) private editor: Editor;

  private file: File | null = null;
  private fileName: string = '';

  get getId() {
    return 'image-button';
  }

  public onFileChange(raw: File) {
    this.file = raw;
    this.fileName = raw.name;
    const uuid = this.generateUUID();

    const width = window.prompt('width');
    const numberWidth = parseInt(width, 10);

    const image = document.createElement('img');
    image.src = `http://placeimg.com/640/480/fashion?random=${uuid}`;
    image.id = uuid;
    image.width = numberWidth;
    image.setAttribute('style', 'opacity: 0');
    document.querySelector('body').appendChild(image);
    this.$nuxt.$loading.start();
    image.onload = () => {
      const height = image.clientHeight;
      if (width && !isNaN(numberWidth)) {
        this.editor.chain().setImage({
          src: `http://placeimg.com/640/480/fashion?random=${uuid}`,
          id: uuid,
          width: numberWidth,
          widthPixel: numberWidth,
          heightPixel: height
        }).run();
      }
      image.remove();
      this.$nuxt.$loading.finish();
    }
  }

  private generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
        r = (d + r)%16 | 0;
        d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r)%16 | 0;
        d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
</script>
