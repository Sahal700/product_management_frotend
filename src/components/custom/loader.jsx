import { Spinner } from "../ui/spinner";

function Loader() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Spinner className="size-10" />
    </div>
  );
}

export { Loader };
