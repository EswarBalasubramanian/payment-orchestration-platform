import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class MetricsService {
  constructor(private readonly paymentsService: PaymentsService) {}

  getMetrics() {
    return {
      totalTransactions: 0,
      successCount: 0,
      failureCount: 0,
      timeoutCount: 0,
      successRate: 0,
      failureRate: 0,
      averageLatency: 0,
      highLatencyCount: 0,
      retryCountTotal: 0,
    };
  }

  getMetricsSummary() {
    const payments = this.paymentsService.getPayments();

    const total = payments.length;
    const success = payments.filter((p) => p.status === 'SUCCESS').length;
    const failed = payments.filter((p) => p.status === 'FAILED').length;
    const timeout = payments.filter((p) => p.status === 'TIMEOUT').length;

    return {
      total,
      success,
      failed,
      timeout,
      successRate: total ? success / total : 0,
    };
  }

  getMetricsLatency() {
    const payments = this.paymentsService.getPayments();

    const avgLatency =
      payments.reduce((acc, p) => acc + (p.latency || 0), 0) / payments.length;

    return { avgLatency };
  }

  getMetricsFailures() {
    const payments = this.paymentsService.getPayments();

    return payments.filter((p) => p.status === 'FAILED');
  }
}
