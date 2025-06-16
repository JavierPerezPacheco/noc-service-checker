import { FileSystemDataSource } from "../infrastructure/datasource/file-system-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";


const logRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
    // new MongoDatabase(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        //** Descomentar para probar */
        new SendEmailLogs(
            emailService,
            logRepository
        ).execute(
            [
                'javiperezpacheco@gmail.com'
            ]
        );

        //** Enviar correo sin adjunto */
        emailService.sendEmail({
            to: 'javiperezpacheco@gmail.com',
            subject: 'Logs de sistema',
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>- - - - - - - - - - - - - - </p>
                <p>Ver logs adjuntos</p>`
        });

        //** Enviar correo con adjunto */
        emailService.sendEmailWithFileSystemLogs(
            [
                'javiperezpacheco@gmail.com'
            ]
        );

        //** Crear tarea con CronService */
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    logRepository,
                    () => console.log(`${url} is ok.`),
                    (error) => console.log(error),
                ).execute(url);

                new CheckService(logRepository, undefined, undefined)
                    .execute('http://localhost:3000');
            }
        );
    }
}
