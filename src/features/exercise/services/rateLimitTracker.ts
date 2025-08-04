interface RateLimitInfo {
  requestsThisMinute: number;
  lastRequestTime: number;
  maxRequestsPerMinute: number;
}

class RateLimitTracker {
  private static instance: RateLimitTracker;
  private rateLimitInfo: RateLimitInfo = {
    requestsThisMinute: 0,
    lastRequestTime: 0,
    maxRequestsPerMinute: 30 // Free tier limit
  };

  private constructor() {}

  static getInstance(): RateLimitTracker {
    if (!RateLimitTracker.instance) {
      RateLimitTracker.instance = new RateLimitTracker();
    }
    return RateLimitTracker.instance;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60000; // 60 seconds

    // Reset counter if a minute has passed
    if (this.rateLimitInfo.lastRequestTime < oneMinuteAgo) {
      this.rateLimitInfo.requestsThisMinute = 0;
    }

    return this.rateLimitInfo.requestsThisMinute < this.rateLimitInfo.maxRequestsPerMinute;
  }

  recordRequest(): void {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Reset counter if a minute has passed
    if (this.rateLimitInfo.lastRequestTime < oneMinuteAgo) {
      this.rateLimitInfo.requestsThisMinute = 0;
    }

    this.rateLimitInfo.requestsThisMinute++;
    this.rateLimitInfo.lastRequestTime = now;
  }

  getRemainingRequests(): number {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Reset counter if a minute has passed
    if (this.rateLimitInfo.lastRequestTime < oneMinuteAgo) {
      this.rateLimitInfo.requestsThisMinute = 0;
    }

    return Math.max(0, this.rateLimitInfo.maxRequestsPerMinute - this.rateLimitInfo.requestsThisMinute);
  }

  getTimeUntilReset(): number {
    const now = Date.now();
    const timeSinceLastRequest = now - this.rateLimitInfo.lastRequestTime;
    return Math.max(0, 60000 - timeSinceLastRequest);
  }

  getStatusMessage(): string {
    const remaining = this.getRemainingRequests();
    const timeUntilReset = this.getTimeUntilReset();

    if (remaining === 0) {
      const secondsLeft = Math.ceil(timeUntilReset / 1000);
      return `Rate limit reached. Please wait ${secondsLeft} seconds before trying again.`;
    }

    return `${remaining} requests remaining this minute.`;
  }
}

export const rateLimitTracker = RateLimitTracker.getInstance(); 