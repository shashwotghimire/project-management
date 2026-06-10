import Image from "next/image";

export function AuthGraphicsRegister() {
  return (
    <Image
      src="/auth-19-gantt.jpg"
      alt="gantt chart"
      width={1000}
      height={800}
      className=" overflow-hidden"
    />
  );
}

export function AuthGraphicsLogin() {
  return (
    <Image
      src="/auth-20-workspace.jpg"
      alt="workspace"
      width={1000}
      height={800}
      className=" overflow-hidden"
    />
  );
}
