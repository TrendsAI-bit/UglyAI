// Simple in-memory rate limiter
// For production, consider using @vercel/kv for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export async function limit(req: Request, maxRequests = 10, windowMs = 60000): Promise<void> {
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const windowStart = now - windowMs;
  
  const entry = rateLimitStore.get(ip);
  
  if (!entry || entry.resetTime < now) {
    // First request or window expired
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return;
  }
  
  if (entry.count >= maxRequests) {
    throw new Error('Rate limit exceeded');
  }
  
  entry.count++;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  }
}, 60000); // Clean up every minute
