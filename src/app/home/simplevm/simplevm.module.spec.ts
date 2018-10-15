import { SimplevmModule } from './simplevm.module';

describe('SimplevmModule', () => {
  let simplevmModule: SimplevmModule;

  beforeEach(() => {
    simplevmModule = new SimplevmModule();
  });

  it('should create an instance', () => {
    expect(simplevmModule).toBeTruthy();
  });
});
