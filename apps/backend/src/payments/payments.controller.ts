import { Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './schemas/payment.schema';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getPayments(): Payment[] {
    return this.paymentsService.getPayments();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.paymentsService.getPayment(id);
  }

  @Post('simulate')
  simulatePayment(): Payment {
    return this.paymentsService.simulatePayment();
  }

  @Post(':id/retry')
  retryPayment(@Param('id') id: string): Payment {
    return this.paymentsService.retryPayment(id);
  }
}
