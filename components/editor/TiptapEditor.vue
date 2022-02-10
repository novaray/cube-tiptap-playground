<template>
  <div id="tiptap-editor" style="display: flex; flex-direction: row; width: 1200px; max-width: 1200px;">
    <div>
      <div v-if="editor" id="toobar-wrap">
        <BasicToolbar :editor="editor" id="basic-toolbar"></BasicToolbar>
        <TableToolbar :editor="editor" id="table-toolbar"></TableToolbar>
      </div>
      <EditorContent :editor="editor" id="tiptap-content-wrap" style="height: 500px;">
      </EditorContent>
    </div>
    <div>
      <pre id="json" style="overflow: auto; max-height: 700px; width: 400px;"></pre>
    </div>
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
import BasicToolbar from '@/components/editor/toolbar/BasicToolbar.vue';
import TableToolbar from '@/components/editor/toolbar/TableToolbar.vue';
import {Vue} from 'nuxt-property-decorator';

@Component({
  components: {TableToolbar, BasicToolbar, EditorContent},
})
export default class TiptapEditor extends Vue {
  private editor: Editor | null = null;
  private timer: any = null;
  private editorJson: string = '';

  @Prop({default: null}) protected readonly value: string;

  public mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
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
          }
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'tiptap__cube_table',
          },
        }),
        TableRow.configure({
          HTMLAttributes: {
            class: 'tiptap__cube_table_tr',
          },
        }),
        TableCell.configure({
          HTMLAttributes: {
            class: 'tiptap__cube_table_td',
          },
        }),
        TableHeader,
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
        })
      ],
      editorProps: {
        attributes: {
          class: ''
        }
      },
      onUpdate: () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
          console.log(this.editor?.getJSON(), this.editor?.getJSON().text);
          // this.editorJson = this.editor?.getJSON().text;
          document.getElementById("json").textContent = JSON.stringify(this.editor?.getJSON(), undefined, 2);
        }, 200);
      },
    });
  }

  public beforeDestroy() {
    this.editor?.destroy();
  }
}
</script>
