
import React from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-saltBlue/10 to-seaMint/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Have questions about our services? Our team is here to help.
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16 bg-lightSalt">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {/* Email */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 rounded-full bg-saltBlue/10 flex items-center justify-center mb-6 mx-auto">
                  <Mail className="h-6 w-6 text-saltBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                <p className="text-charcoal/70 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a href="mailto:support@pdfsalt.com" className="text-saltBlue hover:underline">
                  support@pdfsalt.com
                </a>
              </div>
              
              {/* Phone */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 rounded-full bg-seaMint/10 flex items-center justify-center mb-6 mx-auto">
                  <Phone className="h-6 w-6 text-seaMint" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                <p className="text-charcoal/70 mb-4">
                  Available Monday to Friday, 9am to 5pm Kuwait time.
                </p>
                <a href="tel:+96512345678" className="text-saltBlue hover:underline">
                  +965 1234 5678
                </a>
              </div>
              
              {/* Live Chat */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 rounded-full bg-saltBlue/10 flex items-center justify-center mb-6 mx-auto">
                  <MessageSquare className="h-6 w-6 text-saltBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
                <p className="text-charcoal/70 mb-4">
                  Chat with our support team for immediate assistance.
                </p>
                <Button className="bg-saltBlue hover:bg-saltBlue/90">
                  Start Chat
                </Button>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saltBlue"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saltBlue"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saltBlue"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saltBlue"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-saltBlue hover:bg-saltBlue/90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">How quickly will I receive a response?</h3>
                <p className="text-charcoal/70">We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using the live chat option.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you offer technical support?</h3>
                <p className="text-charcoal/70">Yes, our team provides technical support for all our products and services. You can reach out via email, phone, or live chat.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I request a custom feature?</h3>
                <p className="text-charcoal/70">Absolutely! We're always open to feedback and feature requests. Please use the contact form to describe your needs in detail.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
