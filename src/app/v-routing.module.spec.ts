import { VRoutingModule } from './v-routing.module';

describe('VRoutingModule', () => {
  let vRoutingModule: VRoutingModule;

  beforeEach(() => {
    vRoutingModule = new VRoutingModule();
  });

  it('should create an instance', () => {
    expect(vRoutingModule).toBeTruthy();
  });
});
