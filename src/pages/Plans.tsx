
import React from "react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    console.log(`Selected plan: ${plan}`);
    // This would typically navigate to a checkout page or initiate a payment flow
    // For now, we'll redirect to pricing page
    navigate("/pricing");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-saltBlue/10 to-seaMint/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Select the plan that fits your needs and start transforming your PDF documents today.
            </p>
          </div>
        </section>
        
        {/* Plans Cards */}
        <section className="py-16 bg-lightSalt">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Free Plan</CardTitle>
                  <CardDescription>Try our basic features</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">0 KD</span>
                    <span className="text-charcoal/70">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Basic PDF tools</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Up to 3 files per day</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>File size up to 10MB</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-seaMint mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscribe('free')}
                    className="w-full bg-gray-600 hover:bg-gray-700"
                  >
                    Start for Free
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Personal Plan */}
              <Card className="border-2 border-saltBlue/20 hover:border-saltBlue/50 transition-colors scale-105 shadow-lg">
                <div className="bg-saltBlue text-white py-1 text-sm text-center font-medium">
                  MOST POPULAR
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Personal Plan</CardTitle>
                  <CardDescription>Perfect for individual use</CardDescription>
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
                      <span>Priority email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscribe('personal')}
                    className="w-full bg-saltBlue hover:bg-saltBlue/90"
                  >
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
                      <span>Everything in Personal Plan</span>
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
                  <Button 
                    onClick={() => handleSubscribe('team')}
                    className="w-full bg-seaMint text-charcoal hover:bg-seaMint/90"
                  >
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
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">What's included in the Free plan?</h3>
                <p className="text-charcoal/70">
                  The Free plan gives you access to basic PDF tools with limited usage. It's perfect for occasional users who need to process a few files.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I upgrade from Free to Personal later?</h3>
                <p className="text-charcoal/70">
                  Yes, you can upgrade to any plan at any time. Your new features will be available immediately after upgrading.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How does the Team plan work?</h3>
                <p className="text-charcoal/70">
                  The Team plan allows up to 3 people to use PDF Salt with a single subscription. Each team member gets their own login and workspace.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Plans;
