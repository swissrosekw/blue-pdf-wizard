import React from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-saltBlue/10 to-seaMint/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees or surprises.
            </p>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-16 bg-lightSalt">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Individual Plan */}
              <Card className="border-2 border-saltBlue/20 hover:border-saltBlue/50 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Individual Plan</CardTitle>
                  <CardDescription>Perfect for personal use</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">3 KD</span>
                    <span className="text-charcoal/70">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Unlimited PDF conversions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Access to all PDF tools</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>PDF compression</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>File size up to 100MB</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-saltBlue hover:bg-saltBlue/90">
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Team Plan */}
              <Card className="border-2 border-seaMint/20 hover:border-seaMint/50 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Team Plan</CardTitle>
                  <CardDescription>For teams up to 3 people</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">5 KD</span>
                    <span className="text-charcoal/70">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Everything in Individual Plan</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Up to 3 team members</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>File size up to 200MB</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Advanced document security</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-seaMint text-charcoal hover:bg-seaMint/90">
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I switch between plans?</h3>
                <p className="text-charcoal/70">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How does the team plan work?</h3>
                <p className="text-charcoal/70">The team plan allows up to 3 people to use PDF Salt with a single subscription. Each team member gets their own login and workspace.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-charcoal/70">We accept all major credit cards, debit cards, and digital payment methods common in Kuwait.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I cancel my subscription?</h3>
                <p className="text-charcoal/70">Yes, you can cancel your subscription at any time. Your access will remain until the end of your current billing period.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 bg-saltBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your PDF workflow?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust PDF Salt for their document needs.
            </p>
            <Button className="bg-white text-saltBlue hover:bg-white/90 px-8 py-6 text-lg font-medium">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
