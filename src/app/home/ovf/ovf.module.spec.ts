import { OvfModule } from './ovf.module';

describe('OvfModule', () => {
  let ovfModule: OvfModule;

  beforeEach(() => {
    ovfModule = new OvfModule();
  });

  it('should create an instance', () => {
    expect(ovfModule).toBeTruthy();
  });
});
