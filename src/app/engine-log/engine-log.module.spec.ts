import { EngineLogModule } from './engine-log.module';

describe('EngineLogModule', () => {
  let engineLogModule: EngineLogModule;

  beforeEach(() => {
    engineLogModule = new EngineLogModule();
  });

  it('should create an instance', () => {
    expect(engineLogModule).toBeTruthy();
  });
});
