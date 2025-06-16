import { FileSystemDataSource } from "../infrastructure/datasource/file-system-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasource/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasource/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        //** Descomentar para probar */
        new SendEmailLogs(
            emailService,
            fsLogRepository
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
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok.`),
                    (error) => console.log(error),
                ).execute(url);

            }
        );
    }
}
