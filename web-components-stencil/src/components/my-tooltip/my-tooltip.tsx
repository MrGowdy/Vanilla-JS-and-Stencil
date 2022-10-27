import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-tooltip',
  styleUrl: 'my-tooltip.css',
  shadow: true,
})
export class MyTooltip {
  @Prop() content: string;
  tooltipContent: string;
  @State() tooltipShown = false;

  toggleTooltip() {
    this.tooltipShown = !this.tooltipShown;

    if (this.tooltipShown) {
      this.tooltipContent =
        <p id="content">{this.content}</p>
        ;
    } else {
      this.tooltipContent = null;
    }
  }

  render() {
    return (
      <Host>
        <div id="main-content">
          <slot />
          <span onClick={this.toggleTooltip.bind(this)} id="icon">?</span>
          <div id="tooltip-content">
            {this.tooltipContent}
          </div>
        </div>
      </Host>
    );
  }

}
