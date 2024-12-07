import { ConflictException, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('*/10 * * * * *', { name: 'cron1' }) // cada 10 secs
  cron1() {
    console.log('Cron1: Accion cada 10 s');
  }

  @Cron('*/30 * * * * *', { name: 'cron2' }) // cada 30 secs
  cron2() {
    console.log('Cron2: Accion cada 30 s');
  }

  @Cron('* * * * *', { name: 'cron3' }) // cada 1 min
  cron3() {
    console.log('Cron3: Accion cada 1 min');
  }

  desactivateCron(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    if (!job) throw new ConflictException('Cron not exists');
    else {
      job.stop();
      console.log(`Cron ${name} desactivated`);
      return true;
    }
  }

  activateCron(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    if (!job) throw new ConflictException('Cron not exists');
    else {
      job.start();
      console.log(`Cron ${name} activated`);
      return true;
    }
  }

  getNamesCrons() {
    const names = [];
    for (const nameCron of this.schedulerRegistry.getCronJobs().keys()) {
      names.push(nameCron);
    }

    return names;
  }

  desactivateAllCrons() {
    const names = this.getNamesCrons();

    for (const name of names) {
      this.desactivateCron(name);
    }

    return true;
  }

  activateAllCrons() {
    const names = this.getNamesCrons();

    for (const name of names) {
      this.activateCron(name);
    }

    return true;
  }
}
