import { Injectable } from '@nestjs/common';
import { Payment } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  getPayments(): Payment[] {
    return [
      {
        id: 'tx_001',
        status: 'SUCCESS',
        amount: 50000,
        currency: 'USD',
        retryCount: 0,
        latency: 100,
        logs: [],
      },
      {
        id: 'tx_002',
        status: 'FAILED',
        amount: 20000,
        currency: 'USD',
        retryCount: 3,
        latency: 200,
        logs: ['Attempt 1 failed', 'Attempt 2 failed', 'Attempt 3 failed'],
      },
    ];
  }

  getPayment(id: string): Payment {
    return {
      id,
      status: 'PROCESSING',
      amount: 30000,
      currency: 'USD',
      retryCount: 0,
      latency: 150,
      logs: ['Payment initiated'],
    };
  }

  simulatePayment(): Payment {
    return {
      id: 'tx_003',
      status: 'PROCESSING',
      amount: 30000,
      currency: 'USD',
      retryCount: 0,
      latency: 150,
      logs: ['Payment initiated'],
    };
  }

  retryPayment(id: string): Payment {
    const payment = this.getPayment(id);

    if (!payment) throw new Error('Payment not found');

    if (
      (payment.status === 'FAILED' || payment.status === 'TIMEOUT') &&
      payment.retryCount < 3
    ) {
      payment.retryCount += 1;
      payment.status = 'PROCESSING';
      payment.logs.push(`Retry attempt ${payment.retryCount} initiated`);

      // simulate outcome
      const isSuccess = Math.random() > 0.5;
      payment.status = isSuccess ? 'SUCCESS' : 'FAILED';
      payment.latency = Math.floor(Math.random() * 300);

      payment.logs.push(isSuccess ? 'Retry successful' : 'Retry failed');
    } else {
      payment.logs.push('Max retry attempts reached');
    }

    return payment;
  }
}
