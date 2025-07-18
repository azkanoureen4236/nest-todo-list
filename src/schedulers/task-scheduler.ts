import { Injectable,Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class TaskScheduler{
    private readonly logger = new Logger(TaskScheduler.name)
  constructor(private prisma: PrismaService) {}

  // Run every 5 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  async resetDoneTodos() {
     this.logger.log('Resetting done status for todos...');
    await this.prisma.todo.updateMany({
      where: {
        done: true,
        updatedAt: {
          lt: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
        },
      },
      data: {
        done: false,
      },
    });

    this.logger.log('Done status reset completed.');
  }


}