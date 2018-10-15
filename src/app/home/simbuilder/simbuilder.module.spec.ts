import { SimbuilderModule } from './simbuilder.module';

describe('SimbuilderModule', () => {
  let simbuilderModule: SimbuilderModule;

  beforeEach(() => {
    simbuilderModule = new SimbuilderModule();
  });

  it('should create an instance', () => {
    expect(simbuilderModule).toBeTruthy();
  });
});
