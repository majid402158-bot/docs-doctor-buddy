import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { PageShell } from "./PageShell";

const KEY = "cp-staff-unlocked";
const CODE = "1234";

/**
 * Demo staff gate: staff workspaces (reception, dentist, owner) stay out of
 * the patient experience until unlocked with the demo staff code.
 */
export function StaffGate({ children, area }: { children: ReactNode; area: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(KEY) === "1");
  }, []);

  if (unlocked) return <>{children}</>;

  return (
    <PageShell urgent={false}>
      <div className="mx-auto max-w-sm pt-16 text-center">
        <span className="glass-card mx-auto grid size-14 place-items-center rounded-2xl">
          <Lock aria-hidden className="size-6 text-primary" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold">Staff area — {area}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This workspace is for clinic staff. Enter the demo staff code to continue
          (hint: <b className="text-foreground">1234</b>).
        </p>
        <form
          className="mt-5 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim() === CODE) {
              sessionStorage.setItem(KEY, "1");
              setUnlocked(true);
            } else {
              setError(true);
            }
          }}
        >
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            inputMode="numeric"
            autoComplete="off"
            aria-label="Staff code"
            placeholder="Staff code"
            className="field-glass min-h-11 w-full rounded-2xl px-4 text-center text-sm tracking-[0.3em]"
          />
          <button type="submit" className="btn-3d min-h-11 rounded-2xl bg-primary px-5 text-sm font-extrabold text-primary-foreground">
            Unlock
          </button>
        </form>
        {error && <p role="alert" className="mt-2 text-xs font-bold text-destructive">That code isn't right — try again.</p>}
        <p className="mt-4 text-xs text-muted-foreground">
          A real deployment would use staff accounts with proper sign-in.{" "}
          <Link to="/" className="font-bold text-primary underline underline-offset-2">Back to the patient site</Link>
        </p>
      </div>
    </PageShell>
  );
}
