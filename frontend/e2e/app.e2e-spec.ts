import { AerohivePage } from './app.po';

describe('aerohive App', function() {
  let page: AerohivePage;

  beforeEach(() => {
    page = new AerohivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
