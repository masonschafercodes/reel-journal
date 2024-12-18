import Link from "next/link";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import { auth } from "../../lib/auth";
import { LogoutButton } from "../../components/auth/logout-button";

export default async function Home() {
  const user = await auth.getUser();
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
        >
          Now in Beta!
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Reel Journal
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          The best way to keep track of your TV and Movie watchlist.
        </p>
        <div className="space-x-4">
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
          <Link
            href='/'
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Schedule a Demo
          </Link>
        </div>
        {user && (
          <div
            className="flex flex-col items-center gap-2"
          >
            <div className="text-muted-foreground">
              Welcome back, {user.firstName}!
            </div>
            <LogoutButton
              logoutAction={async () => {
                "use server";
                await auth.logout();
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
