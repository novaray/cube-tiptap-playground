import { Node } from '@tiptap/core'

export interface IVideoOptions {
  allowFullscreen: boolean,
  HTMLAttributes: {
    [key: string]: any
  },
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    externalVideo: {
      /**
       * Add an Video
       */
      setVideo: (options: { src: string }) => ReturnType,
    }
  }
}

export default Node.create<IVideoOptions>({
  name: 'externalVideo',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    }
  },

  parseHTML() {
    return [{
      tag: 'iframe',
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]]
  },

  addCommands() {
    return {
      setVideo: (options: { src: string }) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      },
    }
  },
})
