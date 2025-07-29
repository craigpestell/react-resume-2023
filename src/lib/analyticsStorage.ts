import fs from 'fs/promises';
import path from 'path';

export interface ConversionEvent {
  experimentId: string;
  variantId: string;
  eventType: string;
  userId: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

const STORAGE_FILE = path.join(process.cwd(), '.analytics-data.json');

export class AnalyticsStorage {
  private static events: ConversionEvent[] = [];
  private static initialized = false;

  static async initialize() {
    if (this.initialized) return;
    
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf-8');
      this.events = JSON.parse(data);
      console.log(`Loaded ${this.events.length} events from storage`);
    } catch {
      // File doesn't exist or is corrupt, start fresh
      this.events = [];
      console.log('Starting with empty analytics storage');
    }
    
    this.initialized = true;
  }

  static async addEvent(event: ConversionEvent) {
    await this.initialize();
    
    this.events.push(event);
    
    // Keep only last 10000 events to prevent file from growing too large
    if (this.events.length > 10000) {
      this.events = this.events.slice(-10000);
    }
    
    // Save to file (async, don't wait)
    this.saveToFile().catch(console.error);
    
    return event;
  }

  static async getEvents(): Promise<ConversionEvent[]> {
    await this.initialize();
    return [...this.events]; // Return copy
  }

  static async clearEvents() {
    await this.initialize();
    this.events = [];
    await this.saveToFile();
  }

  private static async saveToFile() {
    try {
      await fs.writeFile(STORAGE_FILE, JSON.stringify(this.events, null, 2));
    } catch (error) {
      console.error('Failed to save analytics data:', error);
    }
  }
}
