import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({ reflect: true }) drawerTitle: string;
  @Prop({ reflect: true }) opened: boolean;

  changeContent(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    return this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-info">
          <h2>Contact Info</h2>
          <p>Reach us via phone</p>
          <ul>
            <li>Phone: 06128732193</li>
            <li>Email: Email</li>
          </ul>
        </div>
      );
    }

    return [
      <div id="backdrop"></div>,
      <aside>
        <header><h1>{this.drawerTitle}</h1></header>
        <section id="tabs">
          <button
            class={!this.showContactInfo ? "active" : ''}
            onClick={this.changeContent.bind(this, 'nav')}
          >Navigation</button>
          <button
            class={this.showContactInfo ? "active" : ''}
            onClick={this.changeContent.bind(this, 'contact')}
          > Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    ]
  }
}