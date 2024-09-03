import { useRouter } from "next/navigation";

export const useHandleBack = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return handleBack;
};
