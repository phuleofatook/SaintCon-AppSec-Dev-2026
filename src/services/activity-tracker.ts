type ActivityEvent = 'started' | 'completed';
type ActivityContext = { language?: string; mode?: 'story' | 'ffa' };
type ActivityPayload = {
  schema_version: 1;
  event_id: string;
  participant_id: string;
  session_id: string;
  track: 'navigator';
  activity_id: string;
  event: ActivityEvent;
  occurred_at: string;
  context: ActivityContext;
};

const endpoint = 'https://appsec.community/api/activity';
const participantKey = 'appsec-community-participant-v1';
const sessionKey = 'appsec-community-session-v1';
const queueKey = 'appsec-community-events-v1';
const sentKey = 'appsec-community-sent-v1';
const optOutKey = 'appsec-community-analytics-opt-out';
let flushPromise: Promise<void> | null = null;

function uuid() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function storageId(storage: Storage, key: string) {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const value = uuid();
    storage.setItem(key, value);
    return value;
  } catch { return uuid(); }
}

function readQueue(): ActivityPayload[] {
  try { return JSON.parse(localStorage.getItem(queueKey) || '[]') as ActivityPayload[]; } catch { return []; }
}

function writeQueue(queue: ActivityPayload[]) {
  try { localStorage.setItem(queueKey, JSON.stringify(queue.slice(-100))); } catch { /* telemetry must never interrupt the academy */ }
}

function sentMarkers() {
  try { return new Set<string>(JSON.parse(sessionStorage.getItem(sentKey) || '[]') as string[]); } catch { return new Set<string>(); }
}

function markSent(marker: string) {
  const markers = sentMarkers();
  markers.add(marker);
  try { sessionStorage.setItem(sentKey, JSON.stringify([...markers].slice(-250))); } catch { /* no-op */ }
}

export function resetActivityIdentity() {
  try { localStorage.removeItem(participantKey); } catch { /* no-op */ }
  try {
    sessionStorage.removeItem(sessionKey);
    sessionStorage.removeItem(sentKey);
  } catch { /* no-op */ }
}

async function post(event: ActivityPayload) {
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event), keepalive: true, credentials: 'omit' });
  if (!response.ok) throw new Error('tracker unavailable');
}

export function flushActivityQueue() {
  if (flushPromise) return flushPromise;
  flushPromise = (async () => {
    const queue = readQueue();
    const attempted = new Set(queue.map((event) => event.event_id));
    const remaining: ActivityPayload[] = [];
    for (const event of queue) {
      try { await post(event); } catch { remaining.push(event); }
    }
    const addedDuringFlush = readQueue().filter((event) => !attempted.has(event.event_id));
    writeQueue([...remaining, ...addedDuringFlush]);
  })().finally(() => { flushPromise = null; });
  return flushPromise;
}

export function recordNavigatorActivity(activityId: string, event: ActivityEvent, context: ActivityContext) {
  try { if (localStorage.getItem(optOutKey) === 'true') return; } catch { /* continue without preference storage */ }
  const marker = `navigator:${activityId}:${event}`;
  if (sentMarkers().has(marker)) return;
  const payload: ActivityPayload = {
    schema_version: 1,
    event_id: uuid(),
    participant_id: storageId(localStorage, participantKey),
    session_id: storageId(sessionStorage, sessionKey),
    track: 'navigator',
    activity_id: activityId,
    event,
    occurred_at: new Date().toISOString(),
    context
  };
  writeQueue([...readQueue(), payload]);
  markSent(marker);
  void flushActivityQueue();
}

window.addEventListener('online', () => void flushActivityQueue());
void flushActivityQueue();
