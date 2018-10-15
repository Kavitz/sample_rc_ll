import { VcenterModule } from './vcenter.module';

describe('VcenterModule', () => {
  let vcenterModule: VcenterModule;

  beforeEach(() => {
    vcenterModule = new VcenterModule();
  });

  it('should create an instance', () => {
    expect(vcenterModule).toBeTruthy();
  });
});
