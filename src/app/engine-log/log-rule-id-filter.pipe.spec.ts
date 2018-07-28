import { LogRuleIDFilterPipe } from './log-rule-id-filter.pipe';

describe('RuleIdFilterPipe', () => {
    it('create an instance', () => {
        const pipe = new LogRuleIDFilterPipe();
        expect(pipe).toBeTruthy();
    });
});
