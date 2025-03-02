import { Button } from "@/components/ui/button";
import HeaderLand from "./dashboard/_components/HeaderLand";
import Image from "next/image";
import Link from "next/link";
import { creatorsData, featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <>
      <HeaderLand />

      <div className="mt-40">
        <HeroSection />

        {/* Stats Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((statsData, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{statsData.value}</div>
                  <div className="text-gray-600">{statsData.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Master Your Next Interview with AI-Powered Practice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((features, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4 pt-4">
                    {features.icon}
                    <h3 className="text-xl font-semibold">{features.title}</h3>
                    <p className="text-gray-600">{features.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {howItWorksData.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Creators */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet the Creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {creatorsData.map((creator, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      <Image
                        src={creator.image}
                        alt={creator.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{creator.name}</div>
                        <div className="text-sm text-gray-600">{creator.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">{creator.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers already improving their interview skills with AI-driven mock sessions.
            </p>
            <Link href="/dashboard">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce">
                Start Practicing Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto text-center px-4 text-gray-600">
            <p>&copy; {new Date().getFullYear()} AI Mock Interviews. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
