import { Node, nodeInputRule } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

/**
 * Matches following attributes in Markdown-typed image: [, src, id]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      setImage: (options: { src: string, id: string, width: number, widthPixel: number, heightPixel: number }) => ReturnType,
    }
  }
}

export default (uploadFn: UploadFn) => {
  return Node.create({
    name: 'image',
    group: 'block',
    draggable: true,
    addAttributes: () => ({
      src: {},
      id: {},
      width: {},
      widthPixel: {},
      heightPixel: {}
    }),
    parseHTML: () => [
      {
        tag: 'img[src]',
        getAttrs: (dom) => {
          if (typeof dom === 'string') return {};
          const element = dom as HTMLImageElement;

          return {
            src: element.getAttribute('src'),
            id: element.getAttribute('id'),
            width: element.getAttribute('widthPixel') ?? element.getAttribute('width'),
            widthPixel: element.getAttribute('widthPixel') ?? element.getAttribute('width'),
            heightPixel: element.getAttribute('heightPixel')
          };
        },
      },
    ],
    renderHTML: ({ HTMLAttributes }) => ['img', HTMLAttributes],

    addCommands() {
      return {
        setImage: (attrs: any) => ({tr, dispatch}) => {
          const { selection } = tr;
          const node = this.type.create(attrs);
          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        }
      }
    },

    addInputRules() {
      return [
        nodeInputRule({
          find: IMAGE_INPUT_REGEX,
          type: this.type,
          getAttributes: match => {
            const [, src, id] = match;
            return {
              src,
              id
            };
          }}),
      ];
    },
    addProseMirrorPlugins() {
      return [dropImagePlugin(uploadFn)];
    },
  });
};

type UploadFn = (image: File) => Promise<{
  src: string;
  id: string;
  width: number;
  heightPixel: number;
}>;

const dropImagePlugin = (upload: UploadFn) => {
  return new Plugin({
    props: {
      handlePaste(view, event, slice) {
        const items = Array.from(event.clipboardData?.items || []);
        const { schema } = view.state;

        items.forEach((item) => {
          const image = item.getAsFile();

          if (item.type.indexOf('image') === 0) {
            event.preventDefault();

            if (upload && image) {
              upload(image).then((info) => {
                const node = schema.nodes.image.create({
                  src: info.src,
                  id: info.id,
                  width: info.width,
                  widthPixel: info.width,
                  heightPixel: info.heightPixel,
                });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              });
            }
          } else {
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
              const node = schema.nodes.image.create({
                src: readerEvent.target?.result,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            };
            if (!image) return;
            reader.readAsDataURL(image);
          }
        });

        return false;
      },
      handleDOMEvents: {
        drop: (view, event) => {
          const hasFiles =
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(
            event.dataTransfer?.files ?? []
          ).filter((file) => /image/i.test(file.type));

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!coordinates) return false;

          images.forEach(async (image) => {
            const reader = new FileReader();

            if (upload) {
              const node = schema.nodes.image.create(
                await upload(image),
              );
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);
            } else {
              reader.onload = (readerEvent) => {
                const node = schema.nodes.image.create({
                  src: readerEvent.target?.result,
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              };
              reader.readAsDataURL(image);
            }
          });

          return true;
        },
      },
    },
  });
};
