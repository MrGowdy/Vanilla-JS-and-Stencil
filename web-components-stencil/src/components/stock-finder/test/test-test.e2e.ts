import { newE2EPage } from '@stencil/core/testing';

describe('test-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<test-test></test-test>');

    const element = await page.find('test-test');
    expect(element).toHaveClass('hydrated');
  });
});
