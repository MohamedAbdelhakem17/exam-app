"use client";
export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h1>{error.message}</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
