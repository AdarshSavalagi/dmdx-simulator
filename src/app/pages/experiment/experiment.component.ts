import {Component, HostListener} from '@angular/core';
import {StimulusMap} from '../../types/StimulsMap'
@Component({
  selector: 'app-experiment',
  standalone: true,
  imports: [],
  templateUrl: './experiment.component.html',
  styleUrl: './experiment.component.css'
})
export class ExperimentComponent {

  isLoading: boolean = true;
  started: boolean = false;
  loader: number = 5;
  private countdownInterval: any;
  private expCountdownInterval: any; // Corrected variable name
  stimuli = ['red', 'green', 'blue']; // Color stimuli
  stimulusMap: StimulusMap = { 'red': 1, 'green': 2, 'blue': 3 };
  result: Array<{ index: number, input: string, isCorrect: boolean|string, keyPressed: string, expected: number, time: number }> = [];
  currentStimulus: string = '';
  rounds: number = 10;
  tempTime: number | undefined;
  report={
    minTime: 0,
    maxTime: 0,
    avgTime: 0,
    correctCount:0
  }

  constructor() {
    this.startCountdown();
    setTimeout(() => {
      this.isLoading = false;
      this.clearCountdown();
    }, 6000); // Start the experiment after 6 seconds
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.loader > 0) {
        this.loader--;
      } else {
        this.clearCountdown();
        this.startExperiment();
      }
    }, 1000);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (this.started && this.result.every((ele) => ele.index !== this.rounds)) {
      this.result.push({
        index: this.rounds,
        input: this.currentStimulus,
        isCorrect: this.stimulusMap[this.currentStimulus] === +event.key,
        keyPressed: event.key,
        expected: this.stimulusMap[this.currentStimulus],
        time: Date.now() - (this.tempTime || Date.now()) // Default to now if tempTime is undefined
      });
    }
  }

  clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  experiment=() => {
    if (this.result.filter((ele)=>ele.index === this.rounds).length === 0) {
        this.result.push({
          index: this.rounds,
          input: this.currentStimulus,
          isCorrect: 'no key stroke ',
          keyPressed:'nothing....',
          expected: this.stimulusMap[this.currentStimulus],
          time: 0
        })
    }
    let index: number;
    do {
      index = Math.floor(Math.random() * this.stimuli.length);
    } while (this.stimuli[index] === this.currentStimulus && this.currentStimulus !== '');

    this.currentStimulus = this.stimuli[index];
    this.tempTime = Date.now();

    this.rounds--;
    if (this.rounds < 0) {
      this.started = false;
      this.stopExperiment();
    }
  }
  startExperiment() {
    console.log("Experiment started..");
    this.started = true;
    this.experiment();
    this.expCountdownInterval = setInterval(this.experiment, 3000); // Stimulus change interval
  }

  stopExperiment() {
    this.result.sort((a, b) => a.index - b.index);
    this.result.pop();
    this.calculateStatistics()
    if (this.expCountdownInterval) {
      clearInterval(this.expCountdownInterval);
    }
  }

  calculateStatistics() {
    if (this.result.length === 0) {
      console.log("No results available.");
      return;
    }
    let totalTime = 0;
    this.report.minTime = Infinity;
    this.report.maxTime = -Infinity;

    for (const entry of this.result) {
      // Calculate min and max time
      if (this.report.minTime === undefined || entry.time < this.report.minTime) {
        this.report.minTime = entry.time;
      }
      if (this.report.maxTime === undefined || entry.time > this.report.maxTime) {
        this.report.maxTime = entry.time;
      }
      totalTime += entry.time;
      if (entry.isCorrect === true) {
        this.report.correctCount++;
      }
    }
    this.report.avgTime = totalTime / this.result.length;
  }
}
