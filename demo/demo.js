// Elaris Theme - JavaScript Demo
// Modern ES6+: classes, regex, destructuring, promises, private fields

const CACHE_TTL_SECONDS = 300;
const CLIENT_SECRET_KEY = Symbol('elaris.client.key');

class RequestThrottler {
  #maxPerWindow;
  #requestTimestamps;

  constructor(maxPerWindow = 60) {
    this.#maxPerWindow = maxPerWindow;
    this.#requestTimestamps = [];
  }

  canExecute(now = Date.now()) {
    const windowStart = now - 60000;
    this.#requestTimestamps = this.#requestTimestamps.filter((ts) => ts > windowStart);
    if (this.#requestTimestamps.length < this.#maxPerWindow) {
      this.#requestTimestamps.push(now);
      return true;
    }
    return false;
  }
}

async function queryTelemetryEndpoints(apiUri, { timeout = 4000, retry = 2 } = {}) {
  const uriValidator = /^https:\/\/[\w.-]+\.[a-z]{2,}(\/.*)?$/i;

  if (!uriValidator.test(apiUri)) {
    throw new TypeError(`Malformed telemetry URI provided: ${apiUri}`);
  }

  const throttler = new RequestThrottler(30);
  if (!throttler.canExecute()) {
    console.warn(`[Elaris Throttler] Request rate ceiling reached for ${apiUri}`);
  }

  const response = await fetch(apiUri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(timeout),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to reach telemetry host`);
  }

  return response.json();
}

module.exports = {
  RequestThrottler,
  queryTelemetryEndpoints,
};
