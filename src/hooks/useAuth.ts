import { useMutation } from "@tanstack/react-query"

export const useAuthMutation = ({mutationFn}:any) =>  {
  const mutation = useMutation({
    mutationFn:mutationFn
  })

  return mutation
}