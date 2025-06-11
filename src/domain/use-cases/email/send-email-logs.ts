import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, logSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface SendLogEmailUseCase {
    execute: ( to: string | string [] ) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ){}

    async execute ( to: string | string [] ){

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs( to );
            if ( !sent ){
                throw new Error( 'Email log not sent' );
            }

            const log = new LogEntity({
                message: 'Log email sent',
                level: logSeverityLevel.low,
                origin: 'send-email-log',
            });
            
            this.logRepository.saveLog( log );
            return true;
        } catch (error) {

            const log = new LogEntity({
                message: `${ error }`,
                level: logSeverityLevel.high, 
                origin: 'send-email.log',
            });

            this.logRepository.saveLog( log );
            return false;
            
        }

    }
}