"use client";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pen, Share2, Layers, Zap, Github, Twitter, Users, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <nav className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Pen className="h-7 w-7 text-slate-900 dark:text-white" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">DrawFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                How it Works
              </Link>
              <Link href="#pricing" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={()=>router.push('/signin')}>
                Sign In
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900"
              onClick={()=>router.push('/signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 rounded-full px-4 py-2 mb-8">
                <Sparkles className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Now with real-time collaboration</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
                Sketch ideas that
                <span className="block bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-white bg-clip-text text-transparent">
                  come to life
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10">
                A virtual whiteboard for sketching hand-drawn like diagrams. Collaborate in real-time, export anywhere, and bring your ideas to life with an intuitive interface.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-lg px-8 py-6">
                  Start Drawing
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>50K+ users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>End-to-end encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>Open source</span>
                </div>
              </div>
            </div>

            <div className="mt-20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950 z-10 h-32 bottom-0"></div>
              <div className="relative rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden bg-white dark:bg-slate-900">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-slate-600 dark:text-slate-400">Untitled Canvas</div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-12 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Pen className="h-16 w-16 mx-auto text-slate-400 dark:text-slate-600" />
                    <p className="text-slate-500 dark:text-slate-500">Your canvas awaits...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Everything you need to create
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Powerful features designed to help you sketch, collaborate, and share your ideas effortlessly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Pen className="h-6 w-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Hand-drawn Feel</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Create diagrams with a natural, sketch-like appearance that feels organic and authentic.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Real-time Collaboration</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Work together with your team in real-time. See changes as they happen, instantly.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Infinite Canvas</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Never run out of space. Pan and zoom freely across your unlimited drawing surface.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Optimized performance ensures smooth drawing even with complex diagrams.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your data is end-to-end encrypted. We can't see your drawings, and neither can anyone else.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Github className="h-6 w-6 text-slate-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Open Source</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Built in the open with the community. Contribute, fork, and make it your own.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Get started in seconds
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                No signup required. Just open and start creating immediately.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Open Your Canvas</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Click "Start Drawing" and you're instantly ready to create. No registration needed.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Create & Collaborate</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Use intuitive tools to sketch diagrams. Share a link to invite others to collaborate.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Export & Share</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Export to PNG, SVG, or share a live link. Your work is automatically saved.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Join thousands of creators, designers, and teams who use DrawFlow every day.
            </p>
            <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-900 text-lg px-8 py-6">
              Start Drawing for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Features</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">About</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Terms</Link></li>
                <li><Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Pen className="h-5 w-5 text-slate-900 dark:text-white" />
              <span className="font-semibold text-slate-900 dark:text-white">DrawFlow</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-4 sm:mt-0">
              © 2025 DrawFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}