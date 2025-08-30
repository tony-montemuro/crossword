import type { AlgorithmActions } from '../types/AlgorithmState';
import type { AlgorithmStep } from '../types/AlgorithmStep';

export type AlgorithmGenerator = Generator<AlgorithmStep, void, unknown>;

export class AlgorithmController {
    private intervalId: number | null = null;
    private generator: AlgorithmGenerator | null = null;
    private isRunning = false;
    private isPaused = false;
    private speed = 500;
    private actions: AlgorithmActions;

    constructor(actions: AlgorithmActions) {
        this.actions = actions;
    }

    startAlgorithm(generator: AlgorithmGenerator, speed = 500): void {
        this.stop();

        this.generator = generator;
        this.speed = speed;
        this.isRunning = true;
        this.isPaused = false;

        this.actions.start();
        this.executeNextStep();
    }

    pause(): void {
        if (this.isRunning && !this.isPaused) {
            this.isPaused = true;
            this.actions.pause();

            if (this.intervalId) {
                clearTimeout(this.intervalId);
                this.intervalId = null;
            }
        }
    }

    resume(): void {
        if (this.isRunning && this.isPaused) {
            this.isPaused = false;
            this.actions.resume();
            this.executeNextStep();
        }
    }

    stop(): void {
        this.isRunning = false;
        this.isPaused = false;

        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }

        this.generator = null;
    }

    reset(): void {
        this.stop();
        this.actions.reset();
    }

    stepOnce(): void {
        if (this.generator && !this.isRunning) {
            const { value, done } = this.generator.next();

            if (done) {
                this.handleCompletion();
            } else {
                this.applyStep(value);
            }
        }
    }

    setSpeed(milliseconds: number): void {
        this.speed = Math.max(50, milliseconds); // Minimum 50ms
    }

    getExecutionState(): { isRunning: boolean; isPaused: boolean; speed: number } {
        return {
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            speed: this.speed
        };
    }

    private executeNextStep(): void {
        if (!this.generator || !this.isRunning || this.isPaused) {
            return;
        }

        const { value, done } = this.generator.next();

        if (done) {
            this.handleCompletion();
        } else {
            this.applyStep(value);

            // Schedule next step
            this.intervalId = setTimeout(() => {
                this.executeNextStep();
            }, this.speed);
        }
    }

    private applyStep(step: AlgorithmStep): void {
        this.actions.incrementStep();
        this.actions.setDescription(step.description);

        if (step.stackVals !== undefined) {
            this.actions.pushToStacks(step.stackVals);
        }
        if (step.isBacktracking !== undefined) {
            this.actions.setBacktracking(step.isBacktracking);
        }
        if (step.word !== undefined) {
            this.actions.addFoundWord(step.word);
        }
        if (step.popStackVals !== undefined && step.popStackVals) {
            this.actions.popFromStacks();
        }
    }

    private handleCompletion(): void {
        this.isRunning = false;
        this.isPaused = false;

        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }

        this.actions.complete();
    }
}
