import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MetricsModule } from './metrics/metrics.module';
import { AlertsModule } from './alerts/alerts.module';
import { HealthModule } from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    PaymentsModule,
    TransactionsModule,
    MetricsModule,
    AlertsModule,
    HealthModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
