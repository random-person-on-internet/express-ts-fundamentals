import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUserSlice, type UserSlice } from "./slices/userSlice";
import { createFileSlice, type FileSlice } from "./slices/fileSlice";
import { createCommentSlice, type CommentSlice } from "./slices/commentSlice";
import {
  createNotificationSlice,
  type NotificationSlice,
} from "./slices/notificationSlice";

type DesignHubStore = UserSlice & FileSlice & CommentSlice & NotificationSlice;

export const useDesignHubStore = create<DesignHubStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...createUserSlice(set, get),
        ...createFileSlice(set, get),
        ...createCommentSlice(set, get),
        ...createNotificationSlice(set, get),
      }),
      { name: "designhub-store" }
    )
  )
);
