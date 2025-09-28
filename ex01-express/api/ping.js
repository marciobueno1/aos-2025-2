// Edge Function (não usa Node/Express)
export const config = { runtime: 'edge' };

export default function handler() {
  return new Response(
    JSON.stringify({ status: 'edge-ok', vercelEnv: process.env.VERCEL_ENV || 'unknown' }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
