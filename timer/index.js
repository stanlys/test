import EventEmitter from 'events';

class Timer extends EventEmitter{
  constructor (total, interval){
    super();
    this.total = total;
    this.interval = interval;
    this.ticks = 0;
  }

  _tick(){
    this.ticks +=1;
    if (this.tick <= this.total){
      this.emit('tick', this.ticks)
    }else{
      this.end();
    }
  }
}
