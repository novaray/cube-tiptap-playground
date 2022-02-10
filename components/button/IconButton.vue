<template>
  <el-button :type="buttonType" :size="getSize" @click="onClick($event)"
             v-html="getHtml">
  </el-button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class IconButton extends Vue {
  @Prop({default: 'primary'}) private readonly type: string;
  @Prop({default: 'small'}) private readonly size: string;
  @Prop({default: ''}) private readonly icon: string;
  @Prop({default: false}) private readonly circle: boolean;
  @Prop({default: false}) private readonly disabled: boolean;
  @Prop({default: false}) private readonly loading: boolean;
  @Prop({default: ''}) private readonly label: string;
  @Prop({default: 'left'}) private readonly labelPosition: string;

  get buttonType() {
    return this.type;
  }

  get getSize() {
    return this.size;
  }

  get iconClass() {
    return this.icon;
  }

  get isCircle() {
    return this.circle;
  }

  get buttonLabel() {
    return this.label;
  }

  get getHtml() {
    if (this.labelPosition === 'right') {
      return `<span><i class="${this.iconClass}"></i>${this.buttonLabel}</span>`;
    } else {
      // <i /> 형태로 내보내면 라벨이 i 태그 안으로 들어가는 버그 생김
      return `<span>${this.buttonLabel}<i class="${this.iconClass}" /></span>`;
    }
  }

  public onClick($event: any) {
    this.$emit('click', $event);
    this.$emit('switch', {
      $event,
    });
  }
}
</script>
