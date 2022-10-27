import { newSpecPage } from '@stencil/core/testing';
import { TestTest } from '../test-test';

describe('test-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TestTest],
      html: `<test-test></test-test>`,
    });
    expect(page.root).toEqualHtml(`
      <test-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </test-test>
    `);
  });
});
