import { useRouter } from "next/navigation";

export const useHandleNext = (props: { route: string }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(props.route);
  };

  return handleButtonClick;
};
