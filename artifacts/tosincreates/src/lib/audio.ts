// Web Audio API Synthesizer for UI sound effects & haptic feedback simulation

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // Lazy initialization on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playTone(880, 0.08, "sine");
    }
    return this.enabled;
  }

  public setEnabled(state: boolean) {
    this.enabled = state;
  }

  public playTone(freq: number, duration: number = 0.05, type: OscillatorType = "sine", volume: number = 0.05) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext play prevented or unsupported
    }
  }

  public playHover() {
    this.playTone(440, 0.03, "sine", 0.02);
  }

  public playClick() {
    this.playTone(660, 0.05, "triangle", 0.04);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.playTone(523.25, 0.08, "sine", 0.05); // C5
    setTimeout(() => this.playTone(659.25, 0.08, "sine", 0.05), 80); // E5
    setTimeout(() => this.playTone(783.99, 0.12, "sine", 0.05), 160); // G5
  }
}

export const soundEngine = new SoundEngine();
