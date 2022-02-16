<template>
  <div id="tiptap-editor" style="display: flex; flex-direction: row; width: 1200px; max-width: 1200px;">
    <div>
      <div v-if="editor" id="toobar-wrap">
        <BasicToolbar :editor="editor" id="basic-toolbar"></BasicToolbar>
        <TableToolbar :editor="editor" id="table-toolbar"></TableToolbar>
      </div>
      <EditorContent :editor="editor" id="tiptap-content-wrap">
      </EditorContent>
      <div>
        <el-button @click="onPasteJsonButton" style="margin-top: 5px;">Paste Json</el-button>
      </div>
    </div>
    <div>
      <pre id="pre-json" style="overflow: auto; height: 700px; max-height: 700px; width: 400px; border: dashed red;"></pre>
      <el-button @click="onCopyJsonButton" style="margin-top: 5px;">Copy Json</el-button>
    </div>
    <PasteJsonDialog ref="jsonDialog" id="paste-json-dialog"></PasteJsonDialog>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {Editor, EditorContent} from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {generateHTML} from '@tiptap/vue-2'
import CustomEditorExternalVideo from '~/components/editor/custom-editor-component/CustomEditorExternalVideo';
import CustomEditorIndent from '@/components/editor/custom-editor-component/CustomEditorIndent'
import CustomEditorImage from '@/components/editor/custom-editor-component/CustomEditorImage';
import BasicToolbar from '@/components/editor/toolbar/BasicToolbar.vue';
import TableToolbar from '@/components/editor/toolbar/TableToolbar.vue';
import PasteJsonDialog from '~/components/dialog/PasteJsonDialog.vue';
import {Vue} from 'nuxt-property-decorator';

@Component({
  components: {PasteJsonDialog, TableToolbar, BasicToolbar, EditorContent},
})
export default class TiptapEditor extends Vue {
  private editor: Editor | null = null;
  private timer: any = null;

  @Prop({default: null}) protected readonly value: string;

  public mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: this.getExtensions(),
      editorProps: {
        attributes: {
          class: 'prose prose-sm h-96 overflow-auto',
        },
      },
      onUpdate: () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
          document.getElementById('pre-json').textContent = JSON.stringify(this.editor?.getJSON(), undefined, 2);
        }, 200);
      },
    });
  }

  public onPasteJsonButton() {
    const jsonDialog = this.$refs.jsonDialog as any;

    jsonDialog.show()
              .then((json: string) => {
                let parseJson = null;
                try {
                  parseJson = JSON.parse(json);
                } catch (error: any) {
                  this.$notify({
                    title: 'Error',
                    message: '유효한 json string 형식이 아닙니다.',
                    type: 'error',
                    duration: 2000
                  });
                  return;
                }

                let html = null;
                try {
                  html = generateHTML(parseJson, this.getExtensions());
                } catch (error: any) {
                  this.$notify({
                    title: 'Error',
                    message: 'TipTap에서 요구하는 Json 형식과 일치하지 않습니다.',
                    type: 'error',
                    duration: 2000
                  });
                  return;
                }

                this.editor?.commands.setContent(html);
              })
              .catch((reject: any) => {

              });
  }

  public upload(file: File) {
    const uuid = this.generateUUID();

    const obj = {
      src: `http://placeimg.com/640/480/fashion?random=${uuid}`,
      id: uuid
    }
    return Promise.resolve(obj);
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

  public getExtensions() {
    return [
      CustomEditorExternalVideo,
      CustomEditorIndent,
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: 'tiptap__cube_heading'
          }
        },
        paragraph: {
          HTMLAttributes: {
            class: 'tiptap__cube_paragraph'
          }
        },
        bold: {
          HTMLAttributes: {
            class: 'tiptap__cube_bold'
          }
        },
        italic: {
          HTMLAttributes: {
            class: 'tiptap__cube_italic'
          }
        },
        strike: {
          HTMLAttributes: {
            class: 'tiptap__cube_strike'
          }
        },
        code: {
          HTMLAttributes: {
            class: 'tiptap__cube_code'
          }
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'tiptap__cube_codeBlock'
          }
        },
        horizontalRule: {
          HTMLAttributes: {
            class: 'tiptap__cube_hr'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'tiptap__cube_bulletList'
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: 'tiptap__cube_orderedList'
          }
        },
        listItem: {
          HTMLAttributes: {
            class: 'tiptap__cube_listItem'
          }
        },
      }),
      Table.configure({
        HTMLAttributes: {
          class: 'table-auto',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-slate-600',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-600',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-slate-600 bg-slate-400',
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'tiptap__cube_mark',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'tiptap__cube_hyperLink'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CustomEditorImage(this.upload)
    ];
  }

  public onCopyJsonButton() {
    const textContent = document.getElementById('pre-json').textContent;

    const t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = textContent;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    this.$notify({
      title: 'Success',
      message: 'Text Copied!',
      type: 'success',
      duration: 2000
    });
  }

  public beforeDestroy() {
    this.editor?.destroy();
  }
}
</script>
