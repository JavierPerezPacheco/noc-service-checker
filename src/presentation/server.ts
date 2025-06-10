import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...');

        //** Descomentar para probar */
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
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
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok.`),
                    (error) => console.log(error),
                ).execute(url);

                new CheckService(fileSystemLogRepository, undefined, undefined)
                    .execute('http://localhost:3000');
            }
        );
    }
}
