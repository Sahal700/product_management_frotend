import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function ErrorAlert({ variant, message }) {
  let className;

  if (variant === "input") {
    className = "flex justify-center items-center h-full w-full";
  } else {
    className =
      "flex justify-center items-center h-full w-full px-[10%] md:px-[20%] lg:px-[30%]";
  }

  return (
    <div className={className}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something Went Wrong.</AlertTitle>
        <AlertDescription>
          <p>
            {message}
            <br />
            Please try again later.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export { ErrorAlert };
