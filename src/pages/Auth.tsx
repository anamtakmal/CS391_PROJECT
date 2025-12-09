import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // todo: remove mock functionality - replace with actual Firebase auth
    setTimeout(() => {
      setIsLoading(false);
      console.log('Auth submitted');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in triggered');
    // todo: remove mock functionality - replace with actual Firebase Google auth
  };

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-background to-card">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-[0.15em] uppercase neon-text">VOID</h1>
            <p className="text-muted-foreground mt-2">Premium Streetwear Design</p>
          </div>

          <Card className="bg-card/50 backdrop-blur-xl border-border">
            <Tabs defaultValue="signin">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin" data-testid="tab-signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="signin" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          data-testid="input-signin-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          data-testid="input-signin-password"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full uppercase tracking-wider gap-2"
                      disabled={isLoading}
                      data-testid="button-signin"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      or continue with
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleGoogleSignIn}
                    data-testid="button-google-signin"
                  >
                    <SiGoogle className="h-4 w-4" />
                    Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    <button className="text-primary hover:underline" data-testid="link-forgot-password">
                      Forgot your password?
                    </button>
                  </p>
                </TabsContent>

                <TabsContent value="signup" className="mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Your name"
                          className="pl-10"
                          data-testid="input-signup-name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          data-testid="input-signup-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10"
                          data-testid="input-signup-password"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full uppercase tracking-wider gap-2 neon-glow"
                      disabled={isLoading}
                      data-testid="button-signup"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      or continue with
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleGoogleSignIn}
                    data-testid="button-google-signup"
                  >
                    <SiGoogle className="h-4 w-4" />
                    Google
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    By signing up, you agree to our{' '}
                    <button className="text-primary hover:underline" data-testid="link-terms">Terms</button>
                    {' '}and{' '}
                    <button className="text-primary hover:underline" data-testid="link-privacy">Privacy Policy</button>
                  </p>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
