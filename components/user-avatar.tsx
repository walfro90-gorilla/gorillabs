import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  user: {
    name?: string
    email?: string
    photoURL?: string
  } | null
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  if (!user) {
    return null
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : user.email
      ? user.email[0].toUpperCase()
      : "U"

  return (
    <Avatar className={className}>
      <AvatarImage src={user.photoURL || ""} alt={user.name || "User"} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
