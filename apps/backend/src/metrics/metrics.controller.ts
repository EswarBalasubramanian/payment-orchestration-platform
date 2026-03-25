import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetrics() {
    return this.metricsService.getMetrics();
  }

  @Get('summary')
  getMetricsSummary() {
    return this.metricsService.getMetricsSummary();
  }

  @Get('failures')
  getMetricsFailures() {
    return this.metricsService.getMetricsFailures();
  }

  @Get('latency')
  getMetricsLatency() {
    return this.metricsService.getMetricsLatency();
  }
}
