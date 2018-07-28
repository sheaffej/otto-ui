import { RuleManagerModule } from './rule-manager.module';

describe('RuleManagerModule', () => {
  let ruleManagerModule: RuleManagerModule;

  beforeEach(() => {
    ruleManagerModule = new RuleManagerModule();
  });

  it('should create an instance', () => {
    expect(ruleManagerModule).toBeTruthy();
  });
});
