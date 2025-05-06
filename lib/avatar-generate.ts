import { micah } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const generate_avatar = () => {
  const avatar = createAvatar(micah, {
    size: 64,
  });
  return avatar.toString();
};
