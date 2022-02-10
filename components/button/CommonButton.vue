<template>
  <el-button ref="elementRef" @click="onClick($event)" :size="buttonSize" :type="buttonType" v-text="buttonLabel"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class CommonButton extends Vue {
  @Prop({default: 'primary'}) private readonly type: string;
  @Prop({default: 'small'}) private readonly size: string;
  @Prop({default: ''}) private readonly label: string;
  @Prop({default: false}) private readonly circle: boolean;
  @Prop({default: false}) private readonly disabled: boolean;
  @Prop({default: false}) private readonly loading: boolean;

  get buttonLabel() {
    return this.label;
  }

  get buttonType() {
    return this.type;
  }

  get buttonSize() {
    return this.size;
  }

  get isCircle() {
    return this.circle;
  }

  get isDisabled() {
    return this.disabled;
  }

  public onClick($event: any) {
    this.$emit('click', $event);
    this.$emit('switch', {
      $event,
    });
  }

  public focus() {
    const element: any = this.$refs.elementRef;
    element.$el.focus();
  }
}
</script>
