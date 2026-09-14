import type { APIRoute } from 'astro'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000)
    return { allowed: false, retryAfter }
  }

  record.count++
  return { allowed: true }
}

const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.preprocess(
    (value) => (typeof value === 'string' ? value.trim() : value),
    z.email('Please enter a valid email address')
  ),
  phone: z.string().trim().optional(),
  projectLocation: z.preprocess(
    (value) => (typeof value === 'string' ? value.trim() : value),
    z.enum(['NYC', 'NJ', 'CJ'])
  ),
  message: z.string().trim().min(5, 'Message must be at least 10 characters').max(2000),
})

const locationLabels: Record<string, string> = {
  NYC: 'New York City',
  NJ: 'North Jersey',
  CJ: 'Central Jersey',
}

function buildEmailHtml(data: z.infer<typeof contactSchema>) {
  const { fullName, email, phone, projectLocation, message } = data
  const safeName = escapeHtml(fullName)
  const safeEmail = escapeHtml(email)
  const safePhone = phone ? escapeHtml(phone) : null
  const safeLocation = escapeHtml(locationLabels[projectLocation] || projectLocation)
  const safeMessage = escapeHtml(message)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #f0f0f0;">
              <h1 style="margin:0;font-size:20px;font-weight:600;color:#08627C;letter-spacing:-0.5px;">New Contact Submission</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#9ca3af;">mmslcontracting.com</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;"><a href="mailto:${safeEmail}" style="color:#08627C;text-decoration:none;">${safeEmail}</a></p>
                  </td>
                </tr>
                ${
                  safePhone
                    ? `
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Phone</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;"><a href="tel:${safePhone}" style="color:#08627C;text-decoration:none;">${safePhone}</a></p>
                  </td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Location</p>
                    <p style="margin:6px 0 0;font-size:15px;color:#111827;">${safeLocation}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                    <div style="margin:8px 0 0;padding:16px;background-color:#f9fafb;border-radius:8px;border:1px solid #f0f0f0;">
                      <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap;">${safeMessage}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#d1d5db;text-align:center;">MMSL Contracting · NYC & New Jersey</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()

    const raw = {
      fullName: formData.get('fullName')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      projectLocation: formData.get('projectLocation')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    }

    const result = contactSchema.safeParse(raw)

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Validation failed'
      console.warn('Contact form validation failed:', result.error.flatten().fieldErrors)
      return new Response(JSON.stringify({ success: false, error: firstError }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { fullName, email, phone, projectLocation, message } = result.data

    await resend.emails.send({
      from: 'MMSL Contracting <noreply@mmslcontracting.com>',
      to: 'contact@mmslcontracting.com',
      replyTo: email,
      subject: `New Contact: ${fullName} — ${locationLabels[projectLocation]}`,
      html: buildEmailHtml(result.data),
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send message. Please try again.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
