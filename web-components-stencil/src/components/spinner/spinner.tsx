import { Component, h, Host } from "@stencil/core";

@Component({
    tag: 'my-spinner',
    styleUrl: 'spinner.css',
    shadow: true,
})
export class Spinner {
    render() {
        return (
            <Host>
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </Host>
        );
    }
}