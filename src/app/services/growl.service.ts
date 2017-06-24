import { Injectable } from '@angular/core';
import { Messages } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Injectable()
export class GrowlService {

    public messages: Message[] = [];

    private sevs = ["success", "info", "warn", "error"]

    public addMessage(severity: MessageSeverity, summary: string, detail: string): void {
        this.messages = [...this.messages]; // spread syntax, workaround for messsages not clearing:  http://bit.ly/2tYFX8s
        this.messages.push({
            severity: this.sevs[severity],
            summary: summary,
            detail: detail
        });
        console.log("Message added");
    }

    public addSuccessMessage(success: boolean, summary: string, detail: string): void {
        let severity = MessageSeverity.SUCCESS;
        if (!success) {
            severity = MessageSeverity.ERROR;
        }
        this.addMessage(severity, summary, detail);
    }
} // class GrowlService

export enum MessageSeverity {
    SUCCESS = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}