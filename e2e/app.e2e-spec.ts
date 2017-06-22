import { OttoUiPage } from './app.po';

describe('otto-ui App', () => {
  let page: OttoUiPage;

  beforeEach(() => {
    page = new OttoUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
