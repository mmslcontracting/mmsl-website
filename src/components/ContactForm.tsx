import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      if (!formRef.current) return

      const result = await emailjs.sendForm(
        'service_n51umy2',
        'template_fh1nv9j',
        formRef.current,
        '_vCk_56WIeEz5QjPB'
      )

      if (result.status !== 200) {
        throw new Error('Failed to send message')
      }

      toast.success('Message sent successfully!')
      formRef.current.reset()
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="fullName"
            required
            className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
            Project Location
          </label>
          <select
            id="location"
            name="projectLocation"
            className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
          >
            <option value="">Select a location</option>
            <option value="NYC">New York City</option>
            <option value="NJ">North Jersey</option>
            <option value="CJ">Central Jersey</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full rounded-none border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary btn-lg w-full transition-opacity ${
            loading ? 'cursor-not-allowed opacity-60' : ''
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader />
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </>
  )
}

function Loader() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 animate-spin fill-white text-gray-200 dark:text-gray-400"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  )
}
