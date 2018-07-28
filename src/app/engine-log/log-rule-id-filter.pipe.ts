import { Pipe, PipeTransform } from '@angular/core';

import { EngineLogEntry } from './services/engine-log.service';

@Pipe({
    name: 'logRuleIdFilter'
})
export class LogRuleIDFilterPipe implements PipeTransform {

    transform(logs: EngineLogEntry[], ruleId: string): EngineLogEntry[] {
        if (!logs) {
            return [];
        } else if (!ruleId) {
            return logs;
        }
        
        return logs.filter(row => row.entry.rule)
            .filter(row => row.entry.rule.toLowerCase().includes(ruleId.toLowerCase()));
       }
}
