import { Meteor } from 'meteor/meteor';
import { createClient, type RedisClientType } from 'redis';
import { promisify } from 'util';

class RedisService {
  private client: RedisClientType | null;
  private isConnected: boolean;

  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async initialize(): Promise<void> {
    try {
      this.client = createClient({
        url: `redis://${Meteor.settings.redis?.host || 'localhost'}:${Meteor.settings.redis?.port || 6379}`,
        password: Meteor.settings.redis?.password,
      });

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Connected to Redis server');
        this.isConnected = true;
      });

      await this.client.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    }
  }

  async set(key: string, value: any, expireSeconds: number | null = null): Promise<string | null> {
    if (!this.isConnected || !this.client) await this.initialize();
    if (!this.client) return null;
    
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    
    if (expireSeconds) {
      return this.client.set(key, stringValue, {
        EX: expireSeconds
      });
    }
    return this.client.set(key, stringValue);
  }

  async get(key: string, parseJson = true): Promise<any> {
    if (!this.isConnected || !this.client) await this.initialize();
    if (!this.client) return null;
    
    const value = await this.client.get(key);
    if (!value) return null;
    
    if (parseJson) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  }

  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }

  async lRange(key: string, start: number, stop: number, parseJson = true): Promise<any[] | null> {
    if (!this.isConnected || !this.client) await this.initialize();
    if (!this.client) return null;
     
    try {
      const values = await this.client.lRange(key, start, stop);
      if (!values || values.length === 0) return [];
     
      if (parseJson) {
        return values.map(value => {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        });
      }
      return values;
    } catch (error) {
      console.error(`Error executing lRange on key ${key}:`, error);
      return null;
    }
  }
}

export const Redis = new RedisService();