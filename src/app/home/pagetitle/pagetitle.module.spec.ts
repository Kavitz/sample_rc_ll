import { PagetitleModule } from './pagetitle.module';

describe('PagetitleModule', () => {
  let pagetitleModule: PagetitleModule;

  beforeEach(() => {
    pagetitleModule = new PagetitleModule();
  });

  it('should create an instance', () => {
    expect(pagetitleModule).toBeTruthy();
  });
});
